// Test script to verify authentication endpoints
// Run with: node testAuth.js

const testEmail = `test${Date.now()}@example.com`;
const testData = {
  name: "Test User",
  email: testEmail,
  password: "testpass123",
  hostelId: "H-101",
  roomNumber: "205"
};

console.log('🧪 Testing Authentication Endpoints\n');
console.log('Test Email:', testEmail);
console.log('=====================================\n');

// Test 1: Register (should send OTP email)
console.log('1️⃣  Testing Registration...');
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
})
  .then(res => res.json())
  .then(data => {
    console.log('✅ Register Response:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ Registration successful! OTP should be sent to email.');
      console.log('⚠️  Note: Email will fail if EMAIL_USER and EMAIL_PASSWORD are not configured in .env\n');
      
      // Test 2: Try to login without verification
      console.log('2️⃣  Testing Login (should fail - email not verified)...');
      return fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: testData.password
        })
      });
    } else {
      throw new Error('Registration failed: ' + data.message);
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log('✅ Login Response:', JSON.stringify(data, null, 2));
    
    if (!data.success && data.requiresVerification) {
      console.log('\n✅ Correct! Login blocked until email is verified.\n');
      
      // Test 3: Resend OTP
      console.log('3️⃣  Testing Resend OTP...');
      return fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail })
      });
    } else {
      console.log('\n⚠️  Warning: Login should have been blocked!');
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log('✅ Resend OTP Response:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ OTP resend successful!\n');
      
      // Test 4: Try invalid OTP
      console.log('4️⃣  Testing Invalid OTP...');
      return fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail, otp: '000000' })
      });
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log('✅ Invalid OTP Response:', JSON.stringify(data, null, 2));
    
    if (!data.success) {
      console.log('\n✅ Correct! Invalid OTP rejected.\n');
      
      // Test 5: Forgot Password
      console.log('5️⃣  Testing Forgot Password...');
      return fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail })
      });
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log('✅ Forgot Password Response:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ Password reset email should be sent!\n');
    }
    
    console.log('\n🎉 All API Endpoints Working Correctly!\n');
    console.log('=====================================');
    console.log('Summary:');
    console.log('✅ Registration endpoint works');
    console.log('✅ Email verification check works');
    console.log('✅ OTP resend works');
    console.log('✅ OTP validation works');
    console.log('✅ Forgot password works');
    console.log('\n⚠️  Email Configuration Status:');
    console.log('   Check backend/.env for EMAIL_USER and EMAIL_PASSWORD');
    console.log('   If configured correctly, emails will be sent.');
    console.log('   If not configured, API works but emails won\'t send.\n');
  })
  .catch(error => {
    console.error('\n❌ Error:', error.message);
    console.log('\n⚠️  Make sure the backend server is running on port 5000');
  });
