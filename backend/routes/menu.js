import express from 'express';
import MenuItem from '../models/MenuItem.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { category, available, search } = req.query;
    
    let query = {};

    if (category) {
      query.category = category;
    }

    if (available !== undefined) {
      query.available = available === 'true';
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const menuItems = await MenuItem.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/menu/:id
// @desc    Get single menu item
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    res.json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/menu
// @desc    Create menu item
// @access  Private/Admin
router.post('/', protect, admin, async (req, res, next) => {
  try {
    const menuItem = await MenuItem.create(req.body);

    res.status(201).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/menu/:id
// @desc    Update menu item
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    res.json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/menu/:id
// @desc    Delete menu item
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    res.json({
      success: true,
      message: 'Menu item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

// @route   PATCH /api/menu/:id/availability
// @desc    Toggle menu item availability
// @access  Private/Admin
router.patch('/:id/availability', protect, admin, async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    menuItem.available = !menuItem.available;
    await menuItem.save();

    res.json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
