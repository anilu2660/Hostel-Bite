import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const verifyAdminAccount = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ Connected to MongoDB\n');

        // Find admin account
        const admin = await User.findOne({ role: 'admin' });
        
        if (!admin) {
            console.log('⚠️  No admin account found in database!');
            console.log('💡 Please create an admin account first.');
            process.exit(0);
        }

        console.log('📊 Admin Account Found:');
        console.log('─'.repeat(80));
        console.log(`Name: ${admin.name}`);
        console.log(`Email: ${admin.email}`);
        console.log(`Role: ${admin.role}`);
        console.log(`Email Verified: ${admin.isEmailVerified ? '✅ Yes' : '❌ No'}`);
        console.log('─'.repeat(80));

        if (!admin.isEmailVerified) {
            console.log('\n🔧 Verifying admin email...');
            admin.isEmailVerified = true;
            admin.emailVerificationOTP = undefined;
            admin.otpExpiry = undefined;
            await admin.save();
            console.log('✅ Admin email verified successfully!\n');
        } else {
            console.log('\n✅ Admin email is already verified!\n');
        }

        console.log('💡 You can now log in with:');
        console.log(`   Email: ${admin.email}`);
        console.log(`   Password: [your admin password]`);
        console.log(`   Login Type: Admin\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

verifyAdminAccount();
