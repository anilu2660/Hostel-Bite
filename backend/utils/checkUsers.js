import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ Connected to MongoDB\n');

        const users = await User.find({}).select('name email role isEmailVerified');
        
        console.log(`📊 Total users in database: ${users.length}\n`);
        
        if (users.length > 0) {
            console.log('👥 User List:');
            console.log('─'.repeat(80));
            users.forEach((user, index) => {
                console.log(`${index + 1}. Name: ${user.name}`);
                console.log(`   Email: ${user.email}`);
                console.log(`   Role: ${user.role}`);
                console.log(`   Email Verified: ${user.isEmailVerified ? '✅' : '❌'}`);
                console.log('─'.repeat(80));
            });
            
            console.log('\n💡 Login Instructions:');
            console.log('   1. Use the email and password you created during signup');
            console.log('   2. If you forgot your password, use the "Forgot Password" link');
            console.log('   3. Make sure your email is verified (✅ above)');
        } else {
            console.log('⚠️  No users found in database!');
            console.log('💡 You need to create a new account via signup at http://localhost:5173/signup');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

checkUsers();
