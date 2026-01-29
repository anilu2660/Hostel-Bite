# HostelBite - Hostel Canteen Website

A premium, production-grade frontend for a hostel canteen ordering system featuring advanced 3D animations, glassmorphism effects, and a modern tech stack.

![HostelBite](https://img.shields.io/badge/React-18.x-blue) ![Vite](https://img.shields.io/badge/Vite-5.x-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-cyan) ![Three.js](https://img.shields.io/badge/Three.js-Latest-black)

## ✨ Features

### 🎨 Premium UI/UX
- **Glassmorphism Effects** - Modern glass-like UI elements with blur effects
- **Dark/Light Mode** - Seamless theme switching with localStorage persistence
- **Responsive Design** - Mobile-first approach, works on all devices
- **Smooth Animations** - Framer Motion powered micro-interactions
- **3D Hero Scene** - Interactive Three.js scene with floating food models

### 🍽️ Core Functionality
- **Browse Menu** - Category filters, search, and detailed food cards
- **Shopping Cart** - Add to cart with animated drawer and quantity controls
- **Order Tracking** - View order history with real-time status updates
- **User Authentication** - Mock login/signup with form validation
- **Admin Panel** - Manage menu items and orders (UI only)

### 🚀 Technical Highlights
- React 18 with Vite for blazing-fast development
- React Router DOM for seamless navigation
- Context API for state management (Theme, Auth, Cart)
- Three.js + React Three Fiber for 3D graphics
- Tailwind CSS with custom design system
- Framer Motion for advanced animations

## 📦 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Animations**: Framer Motion
- **Routing**: React Router DOM v6
- **State Management**: React Context API

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd "d:/Hostel canteen"
   ```

2. **Install dependencies** (already done)
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
hostel-canteen/
├── src/
│   ├── components/          # Reusable components
│   │   ├── 3d/             # Three.js 3D components
│   │   │   └── HeroScene.jsx
│   │   ├── home/           # Home page sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   └── HowItWorks.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── FoodCard.jsx
│   │   ├── CartDrawer.jsx
│   │   └── SkeletonLoader.jsx
│   ├── context/            # React Context providers
│   │   ├── ThemeContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── data/              # Mock data
│   │   └── menuData.js
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin panel pages
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ManageMenu.jsx
│   │   │   └── OrdersList.jsx
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Orders.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── utils/             # Utility functions
│   │   └── animations.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html            # HTML template
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies
```

## 🎯 Key Features Explained

### 3D Hero Scene
The hero section features an interactive 3D scene built with Three.js:
- Floating food models (plate, tea cup, burger, samosa)
- Auto-rotating camera with smooth motion
- Dynamic lighting with multiple light sources
- Optimized for 60fps performance

### Glassmorphism Design
Modern glass-like UI elements with:
- Backdrop blur effects
- Semi-transparent backgrounds
- Subtle borders and shadows
- Dark mode compatible

### State Management
Three main contexts:
- **ThemeContext**: Dark/light mode with localStorage
- **AuthContext**: Mock authentication (admin@canteen.com / admin123)
- **CartContext**: Shopping cart with persistence

### Responsive Design
Mobile-first approach with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔐 Demo Credentials

### Admin Access
- Email: `admin@canteen.com`
- Password: `admin123`

### Student Access
- Email: Any valid email
- Password: Any password (6+ characters)

## 🎨 Design System

### Colors
- **Primary**: Orange gradient (#f58220)
- **Secondary**: Blue gradient (#0ea5e9)
- **Dark**: Slate shades for dark mode

### Typography
- **Display Font**: Outfit (headings)
- **Body Font**: Inter (content)

### Animations
- Fade in/out
- Slide up/down/left/right
- Scale transitions
- Stagger animations for lists
- Custom float and glow effects

## 📱 Pages Overview

### Public Pages
1. **Home** - Hero with 3D scene, features, how it works
2. **Menu** - Browse food items with filters and search
3. **Orders** - View order history and track status
4. **Login** - User authentication
5. **Signup** - User registration with validation

### Admin Pages (Protected)
1. **Dashboard** - Stats and recent orders
2. **Manage Menu** - CRUD operations for menu items
3. **Orders List** - Manage and update order status

## ⚡ Performance Optimizations

- Lazy loading for 3D scenes with Suspense
- Code splitting with React Router
- Optimized 3D models using basic geometries
- CSS animations over JavaScript where possible
- Debounced search functionality
- Memoized components where beneficial

## 🌙 Dark Mode

Toggle between light and dark themes:
- Click the sun/moon icon in navbar
- Preference saved to localStorage
- Smooth transitions between themes
- All components fully compatible

## 🛒 Cart System

Features:
- Add items from menu
- Update quantities
- Remove items
- Persistent storage
- Animated drawer
- Real-time total calculation

## 🔮 Future Enhancements

- Backend API integration
- Real payment gateway
- Push notifications
- Order tracking map
- User reviews and ratings
- Advanced analytics dashboard

## 📄 License

This is a demo project for educational purposes.

## 🙏 Acknowledgments

- React Team for React 18
- Vite Team for the amazing build tool
- Three.js community
- Tailwind CSS team
- Framer Motion developers
- Built for Hostel Canteen and Student 

---

**Built for ❤️ for hostel canteen and mess students**
