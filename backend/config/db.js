import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    const startTime = Date.now();
    
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 30000, // 30 seconds - more reasonable timeout
      socketTimeoutMS: 45000,
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 2,  // Minimum number of connections in the pool
      connectTimeoutMS: 10000, // 10 seconds to establish initial connection
      family: 4, // Force IPv4 to avoid IPv6 delays
    });

    const connectionTime = Date.now() - startTime;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`⏱️  Connection established in ${connectionTime}ms`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Please check:');
    console.error('1. MongoDB Atlas cluster is running');
    console.error('2. IP address is whitelisted in MongoDB Atlas (0.0.0.0/0 for all IPs)');
    console.error('3. Database credentials are correct');
    console.error('4. Network connection is stable');
    console.error('5. MongoDB URL includes database name');
    process.exit(1);
  }
};

export default connectDB;
