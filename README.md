# 🛒 GemXpert - MERN E-Commerce Platform

[![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/mern-stack)
[![PayPal Integration](https://img.shields.io/badge/Payment-PayPal-00457C?style=flat&logo=paypal)](https://developer.paypal.com)
[![JWT Auth](https://img.shields.io/badge/Security-JWT-000000?style=flat&logo=jsonwebtokens)](https://jwt.io)<br>

A full-stack Gem e-commerce platform built with modern technologies, featuring secure payments, admin dashboard, and real-time analytics.<br>

![Project Banner](https://via.placeholder.com/1280x500.png?text=GemXpert+E-Commerce+Demo) <!-- Add actual screenshots later -->

## ✨ Key Features

### 👨💻 User & Auth
- JWT Authentication with HTTP-only cookies
- User profile management
- Order history tracking
- Favorite products collection

### 💎 Products & Store
- Product catalog with filters (category, price)
- Advanced search functionality
- Product reviews and ratings
- Image upload for product listings

### 🛒 Cart & Payments
- Persistent shopping cart
- Multiple payment methods
- Order summary & invoice
- PayPal Sandbox integration

### 📊 Admin Dashboard
- Sales analytics with ApexCharts
- Product & category management
- User role management
- Order fulfillment tracking

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| ⚛️ React 18 | Core framework |
| 🎨 Tailwind CSS | Styling & theming |
| 🚀 Vite | Build tooling |
| 🔄 Redux Toolkit | State management |
| 📈 ApexCharts | Data visualization |

### Backend
| Technology | Purpose |
|------------|---------|
| 🟢 Node.js | Runtime environment |
| 🚆 Express.js | API framework |
| 🍃 MongoDB | Database |
| 🐪 Mongoose | ODM |
| 🔑 JWT | Authentication |

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ & npm
- MongoDB Atlas account
- PayPal Developer credentials

### Installation

1. **Clone Repository**

git clone https://github.com/swiz9/GemXpert.git<br>
cd main

2. **Configure Environment**
Create `.env` in `/backend`:

MONGO_URI=mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/gemxpert<br>
JWT_SECRET=your_ultra_secure_secret<br>
PAYPAL_CLIENT_ID=your_paypal_sandbox_id<br>

 3. **Install Dependencies**

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install


### Running the Application

# Start backend (from /backend)
npm run dev

# Start frontend (from /frontend)
npm run dev


Access the app at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

## 📂 Project Structure

gemxpert/<br>
├── backend/<br>
│   ├── config/       # Database configuration<br>
│   ├── controllers/  # Business logic<br>
│   ├── middleware/   # Auth handlers<br>
│   ├── models/       # MongoDB schemas<br>
│   ├── routes/       # API endpoints<br>
│   └── server.js     # Entry point<br>
└── frontend/<br>
    ├── public/       # Static assets<br>
    └── src/<br>
        ├── assets/   # Images & styles<br>
        ├── components/ # Reusable UI<br>
        ├── features/  # Redux slices<br>
        ├── pages/     # Route components<br>
        └── App.jsx    # Root component<br>


## 📸 Demo Preview

| User View | Admin Dashboard |
|-----------|-----------------|
| ![User Interface](https://via.placeholder.com/400x250.png?text=Product+Page) | ![Admin Panel](https://via.placeholder.com/400x250.png?text=Sales+Analytics) |


## 🤝 Contributors

- **[Anuradha Srimal](https://github.com/swiz9)** (@swiz9)  
  🧠 *AI-Powered Gem Analysis* - Developed smart verification system using machine learning for gem classification

- **[vihangait22902252](https://github.com/vihangait22902252)** (@vihangait22902252)  
  💎 *Gem Collection System* - Implemented gem catalog management and inventory tracking features

- **[Tashika Wijesooriya](https://github.com/Tashika-Wijesooriya)** (@Tashika-Wijesooriya)  
  🛒 *Cart Management* - Built shopping cart functionality with persistent storage and checkout integration

- **[Chamodi Wijesekara](https://github.com/ChamodiRathnayeka)** (@ChamodiRathnayake)  
  👤 *User Management* - Implemented authentication system with JWT, user registration, and role-based access control


