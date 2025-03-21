# 🛒 New E-Commerce Web App

## 🚀 Overview

New_E-commerce-web-app is a modern, full-stack e-commerce application built with
the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides users with
a seamless shopping experience, including product browsing, authentication, cart
management, and secure payment integration.

## Demo

- 💻 Frontend : [e-com Frontend](https://ecom-web-app-frontend.vercel.app/auth/login)
- ⚙️ Backend : [e-com Backend](https://ecom-appbackend.vercel.app)


## 🎯 Features

- 🔐 User Authentication (JWT-based login & signup)
- 🛍 Product Listing & Categories
- 🛒 Cart Management (Add, Remove, Update Quantity)
- 💳 Payment Integration (PayPal)
- 📦 Order Management (Track Orders, View History)
- 🏪 Admin Dashboard (Manage Products, Orders, Users)
- 🌍 Fully Responsive UI

## 🏗️ Tech Stack

- Frontend: React.js, Redux Toolkit, TailwindCSS
- Backend: Node.js, Express.js, MongoDB
- UI library: Shadcn Library
- Authentication: JWT (JSON Web Tokens)
- Database: MongoDB with Mongoose ORM
- Payment Gateway: PayPal API
- Hosting: Frontend - Vercel, Backend - Vercel/Render

## 📂 Folder Structure

```bash
 New_E-commerce-web-app/
│── client/                      # React Frontend
│   ├── src/
│   │   ├── assets/              # Images and PDF files
│   │   ├── components/
│   │   │   ├── admin-view/      # Admin Panel Components
│   │   │   ├── auth/            # Authentication UI Components
│   │   │   ├── common/          # Shared Components
│   │   │   ├── shopping-view/   # Shopping Related Components
│   │   │   ├── ui/              # UI Elements
│   │   ├── config/              # Configuration Files
│   │   ├── lib/                 # Utility Functions
│   │   ├── pages/               # Pages (Home, Product, Cart, etc.)
│   │   │   ├── admin-view/      # Admin Pages
│   │   │   ├── auth/            # Authentication Pages
│   │   │   ├── not-found/       # 404 Page
│   │   │   ├── shopping-view/   # Shopping Related Pages
│   │   │   ├── unauth-page/     # Unauthenticated User Pages
│   │   ├── store/               # Redux Store Management
│   │   │   ├── admin/           # Admin-related State
│   │   │   ├── auth-slice/      # Authentication State
│   │   │   ├── common-slice/    # Common States
│   │   │   ├── shopping/        # Shopping State Management
│   │   │   ├── store.js         # Main Redux Store
│   │   ├── App.css              # Global Styles
│   │   ├── App.jsx              # Main App Component
│   │   ├── index.css            # Global CSS
│   │   ├── main.jsx             # Entry Point
│   ├── package.json             # Frontend Dependencies & Scripts
│
│── server/                      # Backend (Node.js, Express.js)
│   ├── config/                  # Configuration Files (DB, JWT, etc.)
│   ├── controllers/             # Route Handlers
│   ├── helpers/                 # Utility Functions
│   ├── models/                  # Database Models
│   ├── routes/                  # API Routes
│   ├── server.js                # Main Server Entry Point
│   ├── package.json             # Backend Dependencies & Scripts
│
│── README.md                    # Documentation
│── package.json                 # Project Dependencies & Scripts
```

## 🛠️ Installation & Setup

1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/New_E-commerce-web-app.git
cd New_E-commerce-web-app
```

2️⃣ Install Dependencies

- Fronted:

```bash
cd client
npm install
```

- Backend:

```bash
cd server
npm install
```

3️⃣ Set Up Environment Variables

⭐ Create a `.env` file in the `server/` folder and add:

- `MONGODB_URL = your_mongodb_connection`
- `PORT = 2000`
- `JWT_SECRET = "your_secret_key"`
- `CLOUD_API_KEY = your_cloudinary_api_key`
- `CLOUD_API_SECRET_KEY = your_cloudinary_api_secret_key`
- `CLOUD_NAME = your_cloudinary_name`
- `FOLDER_NAME = "your_cloud_folder_name"`
- `PAYPAL_MODE = `
- `PAYPAL_CLIENT_ID =`
- `PAYPAL_CLIENT_SECRET =`

4️⃣ Run the Application

- Start Backend

```bash
cd server
npm install
```

- Start Fronted:

```bash
cd client
npm install
```

## 🚀 Deployment

Deploy Backend on Vercel

```bash
cd server
vercel
```

Deploy Frontend on Vercel

## 📸 Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## 🤝 Contributing

Contributions are welcome! Feel free to `fork` the repo and submit a `pull`
request.

## License

- [MIT](https://choosealicense.com/licenses/mit/) This project is licensed under
  the MIT License.

## 📬 Contact

- 🔗 Your Name – [Raj Yadav📧](https://www.github.com/octokatherine)
- 📩 Email: rajyadav.dev29@gmail.com
- 🧑‍💻 Portfolio: [developer-raj29](https://www.github.com/octokatherine)


//   "version": 2,
//   "builds": [{ "src": "server.js", "use": "@vercel/node" }],
//   "routes": [{ "src": "/(.*)", "dest": "/server.js" }],
//   "headers": [
//     {
//       "source": "/api/(.*)",
//       "headers": [
//         {
//           "key": "Access-Control-Allow-Origin",
//           "value": "https://e-commerce-vitereact.vercel.app"
//         },
//         {
//           "key": "Access-Control-Allow-Methods",
//           "value": "GET, POST, PUT, DELETE, OPTIONS"
//         },
//         {
//           "key": "Access-Control-Allow-Headers",
//           "value": "Content-Type, Authorization"
//         },
//         { "key": "Access-Control-Allow-Credentials", "value": "true" }
//       ]
//     }
//   ]
