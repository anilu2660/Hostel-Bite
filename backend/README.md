# HostelBite Backend API

Backend REST API for HostelBite - Hostel Canteen Management System

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, helmet, cors, rate-limiting

## Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and update values:
```bash
cp .env.example .env
```

### 3. Start MongoDB
Make sure MongoDB is running locally or use MongoDB Atlas connection string.

### 4. Seed Database
```bash
npm run seed
```

This will create:
- Admin user (admin@canteen.com / admin123)
- Student user (student@example.com / student123)
- 22 menu items across 5 categories
- Sample orders

### 5. Start Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single menu item
- `POST /api/menu` - Create menu item (Admin only)
- `PUT /api/menu/:id` - Update menu item (Admin only)
- `DELETE /api/menu/:id` - Delete menu item (Admin only)
- `PATCH /api/menu/:id/availability` - Toggle availability (Admin only)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `PATCH /api/orders/:id/status` - Update order status (Admin only)
- `GET /api/orders/admin/all` - Get all orders (Admin only)

### Statistics (Admin Only)
- `GET /api/stats/dashboard` - Dashboard statistics
- `GET /api/stats/revenue` - Revenue analytics
- `GET /api/stats/popular-items` - Popular menu items

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── middleware/
│   ├── auth.js               # JWT authentication
│   ├── admin.js              # Admin authorization
│   └── errorHandler.js       # Error handling
├── models/
│   ├── User.js               # User model
│   ├── MenuItem.js           # Menu item model
│   └── Order.js              # Order model
├── routes/
│   ├── auth.js               # Auth routes
│   ├── menu.js               # Menu routes
│   ├── orders.js             # Order routes
│   └── stats.js              # Statistics routes
├── utils/
│   ├── generateToken.js      # JWT token generation
│   └── seedData.js           # Database seeding
├── .env                      # Environment variables
├── .env.example              # Environment template
├── package.json              # Dependencies
└── server.js                 # Main server file
```

## Environment Variables

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hostelbite
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

## Demo Credentials

### Admin
- Email: admin@canteen.com
- Password: admin123

### Student
- Email: student@example.com
- Password: student123

## Features

- ✅ JWT Authentication
- ✅ Role-based Authorization (Student/Admin)
- ✅ Password Hashing with bcrypt
- ✅ Input Validation
- ✅ Error Handling
- ✅ Rate Limiting
- ✅ CORS Configuration
- ✅ Security Headers (Helmet)
- ✅ Request Logging (Morgan)

## Development

```bash
# Start in development mode with auto-reload
npm run dev

# Seed database
npm run seed

# Start in production mode
npm start
```

## API Testing

Use tools like Postman or Thunder Client to test the API endpoints.

Example request:
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@canteen.com","password":"admin123"}'

# Get menu items
curl http://localhost:5000/api/menu

# Create order (with token)
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"items":[{"menuItem":"ID","name":"Item","quantity":1,"price":100}],"totalAmount":100}'
```

## License

MIT
