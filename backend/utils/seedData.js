import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import MenuItem from '../models/MenuItem.js';
import Order from '../models/Order.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany();
    await MenuItem.deleteMany();
    await Order.deleteMany();

    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@canteen.com',
      password: 'admin123',
      hostelId: 'ADMIN',
      roomNumber: 'N/A',
      role: 'admin',
    });

    // Create sample student
    console.log('👨‍🎓 Creating sample student...');
    const student = await User.create({
      name: 'John Doe',
      email: 'student@example.com',
      password: 'student123',
      hostelId: 'H-101',
      roomNumber: '205',
      role: 'student',
    });

    // Create menu items
    console.log('🍽️  Creating menu items...');
    const menuItems = await MenuItem.insertMany([
      // Breakfast
      {
        name: 'Aloo Paratha',
        description: 'Stuffed potato flatbread served with curd and pickle',
        price: 40,
        category: 'breakfast',
        veg: true,
        prepTime: '15-20 min',
        rating: 4.5,
        categoryEmoji: '🌅',
        available: true,
      },
      {
        name: 'Poha',
        description: 'Flattened rice with peanuts, curry leaves and lemon',
        price: 30,
        category: 'breakfast',
        veg: true,
        prepTime: '10-15 min',
        rating: 4.2,
        categoryEmoji: '🌅',
        available: true,
      },
      {
        name: 'Bread Omelette',
        description: 'Fluffy omelette with bread slices',
        price: 35,
        category: 'breakfast',
        veg: false,
        prepTime: '10-15 min',
        rating: 4.3,
        categoryEmoji: '🌅',
        available: true,
      },
      {
        name: 'Idli Sambar',
        description: 'Steamed rice cakes with lentil soup and chutney',
        price: 35,
        category: 'breakfast',
        veg: true,
        prepTime: '15-20 min',
        rating: 4.6,
        categoryEmoji: '🌅',
        available: true,
      },
      {
        name: 'Upma',
        description: 'Savory semolina porridge with vegetables',
        price: 30,
        category: 'breakfast',
        veg: true,
        prepTime: '10-15 min',
        rating: 4.0,
        categoryEmoji: '🌅',
        available: true,
      },

      // Lunch
      {
        name: 'Chicken Biryani',
        description: 'Aromatic basmati rice with tender chicken pieces',
        price: 120,
        category: 'lunch',
        veg: false,
        prepTime: '25-30 min',
        rating: 4.8,
        categoryEmoji: '🌞',
        available: true,
      },
      {
        name: 'Veg Thali',
        description: 'Complete meal with dal, sabzi, roti, rice and salad',
        price: 90,
        category: 'lunch',
        veg: true,
        prepTime: '20-25 min',
        rating: 4.4,
        categoryEmoji: '🌞',
        available: true,
      },
      {
        name: 'Paneer Butter Masala',
        description: 'Cottage cheese in rich tomato gravy with naan',
        price: 80,
        category: 'lunch',
        veg: true,
        prepTime: '20-25 min',
        rating: 4.7,
        categoryEmoji: '🌞',
        available: true,
      },
      {
        name: 'Chole Bhature',
        description: 'Spicy chickpeas with fluffy fried bread',
        price: 70,
        category: 'lunch',
        veg: true,
        prepTime: '20-25 min',
        rating: 4.5,
        categoryEmoji: '🌞',
        available: true,
      },
      {
        name: 'Rajma Chawal',
        description: 'Kidney beans curry with steamed rice',
        price: 60,
        category: 'lunch',
        veg: true,
        prepTime: '15-20 min',
        rating: 4.3,
        categoryEmoji: '🌞',
        available: true,
      },

      // Dinner
      {
        name: 'Dal Makhani',
        description: 'Creamy black lentils with butter and cream',
        price: 75,
        category: 'dinner',
        veg: true,
        prepTime: '20-25 min',
        rating: 4.6,
        categoryEmoji: '🌙',
        available: true,
      },
      {
        name: 'Butter Chicken',
        description: 'Chicken in creamy tomato butter sauce',
        price: 110,
        category: 'dinner',
        veg: false,
        prepTime: '25-30 min',
        rating: 4.9,
        categoryEmoji: '🌙',
        available: true,
      },
      {
        name: 'Veg Fried Rice',
        description: 'Stir-fried rice with mixed vegetables',
        price: 65,
        category: 'dinner',
        veg: true,
        prepTime: '15-20 min',
        rating: 4.2,
        categoryEmoji: '🌙',
        available: true,
      },
      {
        name: 'Kadhai Paneer',
        description: 'Cottage cheese with bell peppers in spicy gravy',
        price: 85,
        category: 'dinner',
        veg: true,
        prepTime: '20-25 min',
        rating: 4.5,
        categoryEmoji: '🌙',
        available: true,
      },

      // Snacks
      {
        name: 'Samosa',
        description: 'Crispy fried pastry with spiced potato filling',
        price: 15,
        category: 'snacks',
        veg: true,
        prepTime: '5-10 min',
        rating: 4.4,
        categoryEmoji: '🍿',
        available: true,
      },
      {
        name: 'Vada Pav',
        description: 'Spiced potato fritter in a bun',
        price: 20,
        category: 'snacks',
        veg: true,
        prepTime: '5-10 min',
        rating: 4.3,
        categoryEmoji: '🍿',
        available: true,
      },
      {
        name: 'Pav Bhaji',
        description: 'Spiced vegetable mash with buttered bread',
        price: 50,
        category: 'snacks',
        veg: true,
        prepTime: '15-20 min',
        rating: 4.6,
        categoryEmoji: '🍿',
        available: true,
      },
      {
        name: 'Maggi',
        description: 'Instant noodles with vegetables',
        price: 30,
        category: 'snacks',
        veg: true,
        prepTime: '5-10 min',
        rating: 4.1,
        categoryEmoji: '🍿',
        available: true,
      },

      // Beverages
      {
        name: 'Chai',
        description: 'Hot Indian tea with milk and spices',
        price: 10,
        category: 'beverages',
        veg: true,
        prepTime: '5 min',
        rating: 4.7,
        categoryEmoji: '☕',
        available: true,
      },
      {
        name: 'Cold Coffee',
        description: 'Chilled coffee with milk and ice cream',
        price: 40,
        category: 'beverages',
        veg: true,
        prepTime: '5-10 min',
        rating: 4.5,
        categoryEmoji: '☕',
        available: true,
      },
      {
        name: 'Lassi',
        description: 'Sweet yogurt-based drink',
        price: 35,
        category: 'beverages',
        veg: true,
        prepTime: '5 min',
        rating: 4.4,
        categoryEmoji: '☕',
        available: true,
      },
      {
        name: 'Fresh Lime Soda',
        description: 'Refreshing lime juice with soda',
        price: 25,
        category: 'beverages',
        veg: true,
        prepTime: '5 min',
        rating: 4.2,
        categoryEmoji: '☕',
        available: true,
      },
    ]);

    // Create sample orders
    console.log('📦 Creating sample orders...');
    await Order.create({
      user: student._id,
      items: [
        {
          menuItem: menuItems[5]._id, // Chicken Biryani
          name: menuItems[5].name,
          quantity: 1,
          price: menuItems[5].price,
        },
        {
          menuItem: menuItems[19]._id, // Lassi
          name: menuItems[19].name,
          quantity: 1,
          price: menuItems[19].price,
        },
      ],
      totalAmount: 155,
      status: 'preparing',
      deliveryAddress: {
        hostelId: student.hostelId,
        roomNumber: student.roomNumber,
      },
    });

    console.log('✅ Database seeded successfully!');
    console.log(`
📊 Summary:
   - Users: 2 (1 admin, 1 student)
   - Menu Items: ${menuItems.length}
   - Sample Orders: 1

🔐 Admin Credentials:
   Email: admin@canteen.com
   Password: admin123

👨‍🎓 Student Credentials:
   Email: student@example.com
   Password: student123
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
