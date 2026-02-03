import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // Don't return password by default
    },
    hostelId: {
      type: String,
      trim: true,
    },
    roomNumber: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationOTP: {
      type: String,
      select: false,
    },
    otpExpiry: {
      type: Date,
      select: false,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpiry: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash OTP
userSchema.methods.generateOTP = async function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Hash OTP before saving
  const salt = await bcrypt.genSalt(10);
  this.emailVerificationOTP = await bcrypt.hash(otp, salt);
  
  // OTP expires in 10 minutes
  this.otpExpiry = Date.now() + 10 * 60 * 1000;
  
  return otp; // Return plain OTP to send via email
};

// Verify OTP
userSchema.methods.verifyOTP = async function (enteredOTP) {
  if (!this.emailVerificationOTP || !this.otpExpiry) {
    return false;
  }
  
  // Check if OTP has expired
  if (Date.now() > this.otpExpiry) {
    return false;
  }
  
  // Compare OTP
  return await bcrypt.compare(enteredOTP, this.emailVerificationOTP);
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const crypto = require('crypto');
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash token before saving
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  // Token expires in 1 hour
  this.resetPasswordExpiry = Date.now() + 60 * 60 * 1000;
  
  return resetToken; // Return plain token to send via email
};

// Verify reset token
userSchema.methods.verifyResetToken = function (token) {
  if (!this.resetPasswordToken || !this.resetPasswordExpiry) {
    return false;
  }
  
  // Check if token has expired
  if (Date.now() > this.resetPasswordExpiry) {
    return false;
  }
  
  const crypto = require('crypto');
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  
  return hashedToken === this.resetPasswordToken;
};

const User = mongoose.model('User', userSchema);

export default User;
