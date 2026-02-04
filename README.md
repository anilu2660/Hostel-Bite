# 🍽️ HostelBite - Complete Hostel Canteen Management System

A full-stack, production-ready hostel canteen ordering and management system featuring advanced 3D animations, real-time order tracking, payment integration, and comprehensive admin controls.

![HostelBite](https://img.shields.io/badge/React-18.x-blue) ![Node.js](https://img.shields.io/badge/Node.js-18.x-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen) ![Vite](https://img.shields.io/badge/Vite-5.x-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-cyan)

**Live Demo**: [https://hostel-bite-topaz.vercel.app/](https://hostel-bite-topaz.vercel.app/)

---

## ✨ Features

### 🎨 Premium UI/UX
- **Glassmorphism Effects** - Modern glass-like UI with backdrop blur
- **Dark/Light Mode** - Seamless theme switching with persistence
- **3D Animations** - Three.js powered interactive scenes
- **Framer Motion** - Smooth micro-interactions and page transitions
- **Responsive Design** - Mobile-first, works on all devices
- **Advanced Effects** - Particle backgrounds, cursor glow, scroll progress

### 🍽️ User Features
- **Browse Menu** - Real-time menu with categories, search, and filters
- **Smart Cart** - Animated drawer with quantity controls
- **Razorpay Integration** - Secure payment processing
- **Order Tracking** - Real-time status updates (Pending → Preparing → Ready → Delivered)
- **Order Success Page** - Beautiful confirmation with confetti and 3D animations
- **Contact & Feedback** - 5-star rating system with category selection
- **Password Reset** - Email-based password recovery with secure tokens

### 👨‍💼 Admin Features
- **Dashboard** - Real-time statistics and analytics
- **Menu Management** - Full CRUD with image upload
- **Order Management** - Update status, view customer details
- **Feedback Management** - View ratings, filter by status, respond to feedback
- **Statistics** - Revenue, orders, popular items, customer insights

### 🔐 Authentication & Security
- **JWT Authentication** - Secure token-based auth
- **Email Verification** - OTP-based email verification
- **Password Reset** - Secure token-based password recovery
- **Role-Based Access** - Admin and user roles
- **Protected Routes** - Middleware-based route protection

---

## 📦 Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + Custom CSS
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Animations**: Framer Motion
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **Email**: Nodemailer (Gmail SMTP)
- **Payment**: Razorpay
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Gmail account (for email service)
- Razorpay account (for payments)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   # Server
   NODE_ENV=development
   PORT=5000
   
   # Database
   MONGO_URI=your_mongodb_connection_string
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_FROM=HostelBite <noreply@hostelbite.com>
   
   # Frontend URL
   CLIENT_URL=http://localhost:5173
   
   # Razorpay
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Seed admin account**
   ```bash
   npm run seed-admin
   ```

5. **Start backend server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to root directory**
   ```bash
   cd ..
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`

---

## 📁 Project Structure

```
hostel-canteen/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication
│   │   ├── admin.js           # Admin authorization
│   │   └── errorHandler.js   # Error handling
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── MenuItem.js        # Menu item schema
│   │   ├── Order.js           # Order schema
│   │   └── Feedback.js        # Feedback schema
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── menu.js            # Menu CRUD routes
│   │   ├── orders.js          # Order management
│   │   ├── payment.js         # Razorpay integration
│   │   ├── stats.js           # Statistics API
│   │   └── feedback.js        # Feedback routes
│   ├── utils/
│   │   ├── emailService.js    # Email sending
│   │   └── generateToken.js   # JWT generation
│   ├── scripts/
│   │   ├── seedAdmin.js       # Create admin user
│   │   └── cleanupAdmin.js    # Cleanup admin accounts
│   └── server.js              # Entry point
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   └── HeroScene.jsx  # Three.js scene
│   │   ├── effects/
│   │   │   ├── ParticleBackground.jsx
│   │   │   ├── CursorGlow.jsx
│   │   │   └── ScrollProgress.jsx
│   │   ├── home/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   └── HowItWorks.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FoodCard.jsx
│   │   ├── CartDrawer.jsx
│   │   └── ThemeToggle.jsx
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ManageMenu.jsx
│   │   │   ├── OrdersList.jsx
│   │   │   └── FeedbackList.jsx
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   ├── services/
│   │   ├── api.js             # Axios instance
│   │   ├── authService.js
│   │   ├── menuService.js
│   │   ├── orderService.js
│   │   ├── paymentService.js
│   │   └── feedbackService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json
```

---

## 🔐 Demo Credentials

### Admin Access
- **Email**: `admin@hostelbite.com`
- **Password**: `admin123`

### Test User
- **Email**: Any valid email (with OTP verification)
- **Password**: Minimum 6 characters

---

## 🎯 Key Features Explained

### 1. Authentication System
- **Registration**: Email verification with OTP
- **Login**: JWT-based authentication
- **Password Reset**: Email-based recovery with secure tokens
- **Session Management**: Automatic token refresh

### 2. Menu Management
- **Admin**: Add, edit, delete menu items
- **Image Upload**: Base64 encoding for images
- **Categories**: Breakfast, Lunch, Dinner, Snacks, Beverages
- **Availability**: Toggle item availability
- **Real-time Updates**: Changes reflect immediately

### 3. Order System
- **Cart**: Add items, update quantities
- **Checkout**: Razorpay payment integration
- **Order Tracking**: Real-time status updates
- **Order History**: View past orders
- **Admin Management**: Update order status

### 4. Payment Integration
- **Razorpay**: Secure payment gateway
- **Order Creation**: Automatic order generation
- **Payment Verification**: Server-side verification
- **Success Page**: Beautiful confirmation with order details

### 5. Feedback System
- **5-Star Rating**: Interactive star selection
- **Categories**: Food Quality, Service, Delivery, App Experience
- **Admin Dashboard**: View all feedback with filters
- **Status Management**: Pending, Reviewed, Resolved

### 6. Email Service
- **OTP Verification**: Beautiful HTML emails
- **Password Reset**: Secure reset links
- **Gmail SMTP**: Configured with app passwords

---

## 📱 Pages Overview

### Public Pages
1. **Home** (`/`) - Hero with 3D scene, features, how it works
2. **Menu** (`/menu`) - Browse food items with real-time data
3. **Orders** (`/orders`) - Order history and tracking
4. **Contact** (`/contact`) - Feedback form with ratings
5. **Login** (`/login`) - User authentication
6. **Signup** (`/signup`) - Registration with OTP
7. **Forgot Password** (`/forgot-password`) - Password recovery
8. **Reset Password** (`/reset-password/:token`) - Set new password
9. **Order Success** (`/order-success`) - Order confirmation

### Admin Pages (Protected)
1. **Dashboard** (`/admin`) - Statistics and analytics
2. **Manage Menu** (`/admin/menu`) - CRUD operations
3. **Orders** (`/admin/orders`) - Order management
4. **Feedback** (`/admin/feedback`) - Feedback management

---

## 🎨 Design System

### Colors
- **Primary**: Purple to Pink gradient (#a855f7 → #ec4899)
- **Secondary**: Orange to Red gradient (#f97316 → #ef4444)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#fbbf24)
- **Error**: Red (#ef4444)

### Typography
- **Display**: Outfit (headings)
- **Body**: Inter (content)

### Animations
- **Page Transitions**: Fade and slide
- **Hover Effects**: Scale, lift, glow
- **Loading States**: Spinners, skeletons
- **Success States**: Confetti, checkmarks
- **3D Effects**: Rotating orbs, floating elements

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/verify-otp` - Verify email OTP
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/me` - Get current user

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single item
- `POST /api/menu` - Create item (admin)
- `PUT /api/menu/:id` - Update item (admin)
- `DELETE /api/menu/:id` - Delete item (admin)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `GET /api/orders/admin/all` - Get all orders (admin)
- `PATCH /api/orders/:id/status` - Update status (admin)

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment
- `POST /api/payment/complete` - Complete order

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback/my-feedback` - Get user feedback
- `GET /api/feedback/admin/all` - Get all feedback (admin)
- `PATCH /api/feedback/:id/status` - Update status (admin)
- `GET /api/feedback/stats` - Get statistics (admin)

### Statistics
- `GET /api/stats/dashboard` - Dashboard stats (admin)

---

## 🌙 Environment Variables

### Backend `.env`
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
JWT_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=HostelBite <noreply@hostelbite.com>
CLIENT_URL=http://localhost:5173
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
```

---

## 📍 Location

**Campus**: Amity University Mumbai Campus  
**Address**: Panvel, Maharashtra 410206

**Contact**: support@hostelbite.com  
**Support Hours**: Monday-Sunday, 8:00 AM - 10:00 PM

---

## ⚡ Performance Optimizations

- Lazy loading for 3D scenes
- Code splitting with React Router
- Image optimization (base64 for small images)
- Debounced search
- Memoized components
- MongoDB indexing
- Rate limiting on API
- Compression middleware

---

## 🔒 Security Features

- JWT authentication
- Password hashing (bcryptjs)
- Email verification
- Secure password reset
- CORS configuration
- Helmet security headers
- Rate limiting
- Input validation
- XSS protection

---

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Backend (Render/Railway)
1. Push to GitHub
2. Connect to hosting service
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster
2. Get connection string
3. Add to environment variables

---

## 🛠️ Scripts

### Backend
```bash
npm run dev          # Start with nodemon
npm start            # Start production
npm run seed-admin   # Create admin account
```

### Frontend
```bash
npm run dev          # Start development
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🐛 Known Issues & Solutions

### Email Not Received
- Check spam folder
- Verify Gmail app password
- Check email configuration in `.env`

### Payment Fails
- Verify Razorpay credentials
- Check test/live mode
- Ensure proper key configuration

### Images Not Displaying
- Clear browser cache (Ctrl + Shift + R)
- Check image upload size
- Verify base64 encoding

---

## 🔮 Future Enhancements

- [ ] Real-time notifications (Socket.io)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Order scheduling
- [ ] Loyalty points system
- [ ] Cloud image storage (Cloudinary)
- [ ] SMS notifications
- [ ] Mobile app (React Native)

---

## 📄 License

This project is for educational purposes.

---

## 🙏 Acknowledgments

- React Team for React 18
- Vite Team for the amazing build tool
- Three.js community
- Tailwind CSS team
- Framer Motion developers
- Razorpay for payment integration
- MongoDB team
- Express.js community

---

## 👨‍💻 Developer

Built with ❤️ for hostel students

**Contact**: support@hostelbite.com

---

**⭐ If you like this project, please give it a star on GitHub!**
