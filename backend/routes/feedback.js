import express from 'express';
import Feedback from '../models/Feedback.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

// @route   POST /api/feedback
// @desc    Submit feedback
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    const { rating, category, message } = req.body;

    if (!rating || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide rating and message',
      });
    }

    const feedback = await Feedback.create({
      user: req.user._id,
      rating,
      category,
      message,
    });

    const populatedFeedback = await Feedback.findById(feedback._id)
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback!',
      data: populatedFeedback,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/feedback/my-feedback
// @desc    Get user's own feedback
// @access  Private
router.get('/my-feedback', protect, async (req, res, next) => {
  try {
    const feedback = await Feedback.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: feedback.length,
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/feedback/admin/all
// @desc    Get all feedback (admin)
// @access  Private/Admin
router.get('/admin/all', protect, admin, async (req, res, next) => {
  try {
    const { status, rating, category } = req.query;
    
    let query = {};

    if (status) {
      query.status = status;
    }

    if (rating) {
      query.rating = parseInt(rating);
    }

    if (category) {
      query.category = category;
    }

    const feedback = await Feedback.find(query)
      .populate('user', 'name email hostelId roomNumber')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: feedback.length,
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PATCH /api/feedback/:id/status
// @desc    Update feedback status (admin)
// @access  Private/Admin
router.patch('/:id/status', protect, admin, async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;

    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    if (status) {
      feedback.status = status;
    }

    if (adminNotes !== undefined) {
      feedback.adminNotes = adminNotes;
    }

    await feedback.save();

    const populatedFeedback = await Feedback.findById(feedback._id)
      .populate('user', 'name email hostelId roomNumber');

    res.json({
      success: true,
      data: populatedFeedback,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/feedback/stats
// @desc    Get feedback statistics (admin)
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res, next) => {
  try {
    const totalFeedback = await Feedback.countDocuments();
    const averageRating = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    const ratingDistribution = await Feedback.aggregate([
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    const statusCounts = await Feedback.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalFeedback,
        averageRating: averageRating[0]?.avgRating || 0,
        ratingDistribution,
        statusCounts,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
