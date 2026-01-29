// Mock menu data for the canteen
export const menuData = [
  // Breakfast
  {
    id: 1,
    name: 'Masala Dosa',
    category: 'breakfast',
    price: 40,
    description: 'Crispy dosa with potato filling and sambhar',
    image: '/images/dosa.jpg',
    available: true,
    veg: true,
    rating: 4.5,
    prepTime: '15 min'
  },
  {
    id: 2,
    name: 'Poha',
    category: 'breakfast',
    price: 25,
    description: 'Flattened rice with peanuts and spices',
    image: '/images/poha.jpg',
    available: true,
    veg: true,
    rating: 4.2,
    prepTime: '10 min'
  },
  {
    id: 3,
    name: 'Aloo Paratha',
    category: 'breakfast',
    price: 35,
    description: 'Stuffed flatbread with potato filling',
    image: '/images/paratha.jpg',
    available: true,
    veg: true,
    rating: 4.6,
    prepTime: '12 min'
  },
  {
    id: 4,
    name: 'Idli Sambhar',
    category: 'breakfast',
    price: 30,
    description: 'Steamed rice cakes with lentil soup',
    image: '/images/idli.jpg',
    available: true,
    veg: true,
    rating: 4.4,
    prepTime: '10 min'
  },
  {
    id: 5,
    name: 'Bread Omelette',
    category: 'breakfast',
    price: 35,
    description: 'Fluffy omelette with bread slices',
    image: '/images/omelette.jpg',
    available: true,
    veg: false,
    rating: 4.3,
    prepTime: '8 min'
  },

  // Lunch
  {
    id: 6,
    name: 'Dal Chawal',
    category: 'lunch',
    price: 50,
    description: 'Lentil curry with steamed rice',
    image: '/images/dal-chawal.jpg',
    available: true,
    veg: true,
    rating: 4.5,
    prepTime: '20 min'
  },
  {
    id: 7,
    name: 'Rajma Rice',
    category: 'lunch',
    price: 60,
    description: 'Kidney beans curry with rice',
    image: '/images/rajma.jpg',
    available: true,
    veg: true,
    rating: 4.7,
    prepTime: '25 min'
  },
  {
    id: 8,
    name: 'Chicken Biryani',
    category: 'lunch',
    price: 120,
    description: 'Aromatic rice with tender chicken pieces',
    image: '/images/biryani.jpg',
    available: true,
    veg: false,
    rating: 4.8,
    prepTime: '30 min'
  },
  {
    id: 9,
    name: 'Paneer Butter Masala',
    category: 'lunch',
    price: 80,
    description: 'Cottage cheese in rich tomato gravy',
    image: '/images/paneer.jpg',
    available: true,
    veg: true,
    rating: 4.6,
    prepTime: '22 min'
  },
  {
    id: 10,
    name: 'Chole Bhature',
    category: 'lunch',
    price: 70,
    description: 'Spicy chickpeas with fried bread',
    image: '/images/chole.jpg',
    available: false,
    veg: true,
    rating: 4.7,
    prepTime: '25 min'
  },

  // Dinner
  {
    id: 11,
    name: 'Veg Thali',
    category: 'dinner',
    price: 90,
    description: 'Complete meal with dal, sabzi, roti, rice',
    image: '/images/thali.jpg',
    available: true,
    veg: true,
    rating: 4.8,
    prepTime: '25 min'
  },
  {
    id: 12,
    name: 'Butter Chicken',
    category: 'dinner',
    price: 140,
    description: 'Creamy tomato-based chicken curry',
    image: '/images/butter-chicken.jpg',
    available: true,
    veg: false,
    rating: 4.9,
    prepTime: '30 min'
  },
  {
    id: 13,
    name: 'Fried Rice',
    category: 'dinner',
    price: 70,
    description: 'Stir-fried rice with vegetables',
    image: '/images/fried-rice.jpg',
    available: true,
    veg: true,
    rating: 4.4,
    prepTime: '18 min'
  },
  {
    id: 14,
    name: 'Kadhai Paneer',
    category: 'dinner',
    price: 85,
    description: 'Cottage cheese with bell peppers',
    image: '/images/kadhai-paneer.jpg',
    available: true,
    veg: true,
    rating: 4.5,
    prepTime: '20 min'
  },

  // Snacks
  {
    id: 15,
    name: 'Samosa',
    category: 'snacks',
    price: 15,
    description: 'Crispy fried pastry with potato filling',
    image: '/images/samosa.jpg',
    available: true,
    veg: true,
    rating: 4.6,
    prepTime: '5 min'
  },
  {
    id: 16,
    name: 'Vada Pav',
    category: 'snacks',
    price: 20,
    description: 'Spiced potato fritter in a bun',
    image: '/images/vada-pav.jpg',
    available: true,
    veg: true,
    rating: 4.5,
    prepTime: '7 min'
  },
  {
    id: 17,
    name: 'Pav Bhaji',
    category: 'snacks',
    price: 50,
    description: 'Spiced vegetable mash with bread',
    image: '/images/pav-bhaji.jpg',
    available: true,
    veg: true,
    rating: 4.7,
    prepTime: '15 min'
  },
  {
    id: 18,
    name: 'Maggi',
    category: 'snacks',
    price: 30,
    description: 'Instant noodles with vegetables',
    image: '/images/maggi.jpg',
    available: true,
    veg: true,
    rating: 4.3,
    prepTime: '8 min'
  },

  // Beverages
  {
    id: 19,
    name: 'Chai',
    category: 'beverages',
    price: 10,
    description: 'Hot Indian tea',
    image: '/images/chai.jpg',
    available: true,
    veg: true,
    rating: 4.8,
    prepTime: '5 min'
  },
  {
    id: 20,
    name: 'Coffee',
    category: 'beverages',
    price: 15,
    description: 'Fresh brewed coffee',
    image: '/images/coffee.jpg',
    available: true,
    veg: true,
    rating: 4.4,
    prepTime: '5 min'
  },
  {
    id: 21,
    name: 'Cold Coffee',
    category: 'beverages',
    price: 40,
    description: 'Chilled coffee with ice cream',
    image: '/images/cold-coffee.jpg',
    available: true,
    veg: true,
    rating: 4.6,
    prepTime: '7 min'
  },
  {
    id: 22,
    name: 'Lassi',
    category: 'beverages',
    price: 35,
    description: 'Refreshing yogurt-based drink',
    image: '/images/lassi.jpg',
    available: true,
    veg: true,
    rating: 4.5,
    prepTime: '5 min'
  }
];

export const categories = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'breakfast', name: 'Breakfast', icon: '🌅' },
  { id: 'lunch', name: 'Lunch', icon: '🍛' },
  { id: 'dinner', name: 'Dinner', icon: '🌙' },
  { id: 'snacks', name: 'Snacks', icon: '🍟' },
  { id: 'beverages', name: 'Beverages', icon: '☕' }
];
