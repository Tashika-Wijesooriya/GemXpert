
# 💎 GemXpert - AI-Powered Gem Marketplace

[![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/mern-stack)
[![AI Verification](https://img.shields.io/badge/AI-Gem%20Verification-FF6F00?style=flat&logo=openai)](https://arxiv.org/abs/2108.07258)
[![PayPal](https://img.shields.io/badge/Payments-Powered%20by%20PayPal-00457C?style=flat&logo=paypal)](https://developer.paypal.com)

🌐 *"Empowering gem enthusiasts with AI-driven authenticity checks and a trusted marketplace for verified gems."*

![GemXpert Demo](https://via.placeholder.com/1280x500.png?text=GemXpert+AI+Marketplace+Preview)

---

## ✨ Key Features

### 🔬 Core Capabilities
- **AI-Powered Gem Identification**  
  🧠 Deep learning model for classifying 20+ gem types  
  📊 Quality analysis compared to certified standards  
  🧪 Real-time verification through image inputs

### 🛍️ Marketplace Tools
- **For Sellers**  
  💎 Add gem listings with certification uploads  
  📸 Upload high-res images for buyer inspection  
  📈 Dashboard with sales + traffic analytics

- **For Buyers**  
  🔎 Filter search by gem type, origin, clarity, etc.  
  📖 See full provenance and verification history  
  ⭐ Save to wishlist or personal collection

### 👥 User & Account System
- 👤 Role-based users (Admin, Seller, Buyer)  
- 📍 Multi-address management  
- 🔔 Notifications for price drops & gem status

### 🛒 Secure Transactions
- 💳 **PayPal integration** for safe payments  
- 📦 Order tracking & shipping with insurance  
- 🧾 Automated invoices and receipts  
- ⚖️ Dispute management system

---

## 🛠 Tech Stack

### Frontend
| Module            | Tech                     |
|------------------|--------------------------|
| Framework        | React 18 + Vite          |
| State Management | Redux Toolkit            |
| Styling          | Tailwind CSS + Flowbite  |
| Charts           | ApexCharts               |
| Payments         | **PayPal REST API**      |

### Backend
| Module            | Tech                     |
|------------------|--------------------------|
| Server           | Node.js + Express        |
| Database         | MongoDB + Mongoose       |
| Auth             | JWT + Secure Cookies     |
| AI Integration   | Python (via API bridge)  |
| Image Uploads    | Cloudinary API           |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas Cluster
- Python 3.10+ for AI model
- Cloudinary account
- PayPal Developer account

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/swiz9/GemXpert.git
cd GemXpert
```

### 2️⃣ Set Up Environment Variables

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
CLOUDINARY_URL=your_cloudinary_url
```

### 3️⃣ Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4️⃣ Run the App

```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

- Frontend: `http://localhost:5173`
- API Server: `http://localhost:5000/api`

---


## 🤝 Contributors

| Name                      | GitHub                                | Role                                              |
|---------------------------|----------------------------------------|---------------------------------------------------|
| Anuradha Srimal           | [@swiz9](https://github.com/swiz9)     | 🧠 AI Model + Gem Verification Logic               |
| vihangait22902252         | [@vihangait22902252](https://github.com/vihangait22902252) | 💎 Marketplace + Catalog System     |
| Tashika Wijesooriya       | [@Tashika-Wijesooriya](https://github.com/Tashika-Wijesooriya) | 🛒 Checkout + PayPal Integration |
| Chamodi Rathnayake        | [@ChamodiRathnayake](https://github.com/ChamodiRathnayake) | 👤 User Roles + Auth System          |





