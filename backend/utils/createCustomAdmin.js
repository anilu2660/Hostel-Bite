import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Use the correct MongoDB URI from .env
const MONGODB_URI = 'mongodb+srv://kesh2660:Anujup2660@cluster0.hbsyrvk.mongodb.net/?appName=Cluster0';

const updateAdminEmail = async () => {
  try {
    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Define User schema inline
    const userSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      password: String,
      hostelId: String,
      roomNumber: String,
      role: { type: String, enum: ['student', 'admin'], default: 'student' },
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', userSchema);

    // Delete old admin user with email 'admin2660@'
    await User.deleteOne({ email: 'admin2660@' });
    console.log('🗑️  Deleted old admin user (admin2660@)');

    // Check if new email already exists
    const existingUser = await User.findOne({ email: 'admin2660@gmail.com' });
    
    if (existingUser) {
      console.log('⚠️  User with email admin2660@gmail.com already exists!');
      console.log('Updating password and role...');
      
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('kesh2660', salt);
      
      existingUser.password = hashedPassword;
      existingUser.role = 'admin';
      existingUser.name = 'Admin Kesh';
      await existingUser.save();
      
      console.log('✅ User updated successfully!');
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('kesh2660', salt);

      // Create new admin user with updated email
      const admin = await User.create({
        name: 'Admin Kesh',
        email: 'admin2660@gmail.com',
        password: hashedPassword,
        hostelId: 'ADMIN',
        roomNumber: 'N/A',
        role: 'admin',
      });

      console.log('✅ Admin user created successfully!');
      console.log(`
📊 Admin Details:
   Name: ${admin.name}
   Email: ${admin.email}
   Role: ${admin.role}
      `);
    }

    console.log(`
🔐 Your Updated Login Credentials:
   Email: admin2660@gmail.com
   Password: kesh2660

📍 Login URL: http://localhost:5173/login
    `);

    await mongoose.connection.close();
    console.log('✅ Done! You can now login with your updated credentials.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

updateAdminEmail();
