# AlgoForDaSeat

### **Second Semester Final Project for Design and Analysis of Algorithms**
Solving real-world problems using algorithms.

## **Project Overview**
AlgoForDaSeat is a web-based solution designed to optimize student enrollment in public schools based on **proximity, performance, and social criteria**. It leverages **Vue.js (frontend), Node.js (backend), PostgreSQL (database), and JWT authentication** for a full-stack implementation.

---

## **🖥️ Tech Stack**
- **Frontend**: Vue.js, Vue Router, Pinia (State Management)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

---

## **📁 Folder Structure**
### **Backend (`server/`)**
```
server/
│── config/
│   ├── db.js         # PostgreSQL connection
│   ├── env.js        # Environment variable setup
│── controllers/
│   ├── authController.js  # Handles authentication (login, register)
│── middleware/
│   ├── authMiddleware.js  # Protects routes using JWT
│── models/
│   ├── userModel.js       # Defines user schema for PostgreSQL
│── routes/
│   ├── authRoutes.js      # Authentication routes
│── index.js               # Main server entry point
│── package.json           # Dependencies
│── .env                   # Environment variables (JWT secret, DB credentials)


### **Frontend (`client/`)**
client/
│── src/
│   ├── components/
│   │   ├── Login.vue       # Login form
│   │   ├── Register.vue    # Signup form
│   ├── store/
│   │   ├── auth.js         # Vue state management for authentication
│   ├── router/
│   │   ├── index.js        # Vue Router setup
│   ├── views/
│   │   ├── Dashboard.vue   # Protected route (requires JWT)
│── public/
│── package.json           # Vue dependencies
│── .env                   # Frontend environment variables
```

---

## **🔐 JWT Authentication Flow**
1. **User registers** → Password is hashed (`bcrypt.js`) and stored securely.
2. **User logs in** → If credentials match, JWT token is generated.
3. **Token verification** → Protected routes require valid JWT.
4. **Logout** → Token is removed from storage.

---

## **🚀 Setup Instructions**
### **1️⃣ Backend Setup**
```sh
cd server
npm install
npm start
