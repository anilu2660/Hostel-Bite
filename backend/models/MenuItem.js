import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide item name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide price'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Please provide category'],
      enum: ['breakfast', 'lunch', 'dinner', 'snacks', 'beverages'],
    },
    veg: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: '/images/default-food.jpg',
    },
    available: {
      type: Boolean,
      default: true,
    },
    prepTime: {
      type: String,
      default: '15-20 min',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    categoryEmoji: {
      type: String,
      default: '🍽️',
    },
  },
  {
    timestamps: true,
  }
);

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
