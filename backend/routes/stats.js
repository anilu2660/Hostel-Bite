import express from 'express';
import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

// @route   GET /api/stats/dashboard
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/dashboard', protect, admin, async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Total orders today
    const totalOrdersToday = await Order.countDocuments({
      createdAt: { $gte: today },
    });

    // Revenue today
    const revenueToday = await Order.aggregate([
      { $match: { createdAt: { $gte: today } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    // Active orders (pending + preparing)
    const activeOrders = await Order.countDocuments({
      status: { $in: ['pending', 'preparing'] },
    });

    // Total menu items
    const totalMenuItems = await Order.countDocuments();

    // Recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .populate('items.menuItem', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalOrdersToday,
        revenueToday: revenueToday[0]?.total || 0,
        activeOrders,
        totalMenuItems,
        recentOrders,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/stats/revenue
// @desc    Get revenue analytics
// @access  Private/Admin
router.get('/revenue', protect, admin, async (req, res, next) => {
  try {
    const { period = 'week' } = req.query;
    
    let startDate = new Date();
    
    if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    const revenue = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          total: { $sum: '$totalAmount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: revenue,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/stats/popular-items
// @desc    Get popular menu items
// @access  Private/Admin
router.get('/popular-items', protect, admin, async (req, res, next) => {
  try {
    const popularItems = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.menuItem',
          totalOrders: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
        },
      },
      { $sort: { totalOrders: -1 } },
      { $limit: 10 },
    ]);

    // Populate menu item details
    const populatedItems = await MenuItem.populate(popularItems, {
      path: '_id',
      select: 'name price category image',
    });

    res.json({
      success: true,
      data: populatedItems,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
