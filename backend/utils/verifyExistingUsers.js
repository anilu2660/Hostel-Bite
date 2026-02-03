import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

/**
 * Utility script to mark all existing users as email verified
 * Run this once after implementing email verification to ensure existing users can still log in
 */

const markExistingUsersAsVerified = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ Connected to MongoDB');

    // Find all users who are not verified
    const unverifiedUsers = await User.find({ isEmailVerified: false });

    console.log(`\n📊 Found ${unverifiedUsers.length} unverified users`);

    if (unverifiedUsers.length === 0) {
      console.log('✅ All users are already verified!');
      process.exit(0);
    }

    // Update all users to verified
    const result = await User.updateMany(
      { isEmailVerified: false },
      { 
        $set: { isEmailVerified: true },
        $unset: { emailVerificationOTP: '', otpExpiry: '' }
      }
    );

    console.log(`\n✅ Successfully verified ${result.modifiedCount} users`);
    console.log('\nVerified users:');
    unverifiedUsers.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.name} (${user.email})`);
    });

    console.log('\n🎉 All existing users can now log in!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

markExistingUsersAsVerified();
