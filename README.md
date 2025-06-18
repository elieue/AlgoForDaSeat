# AlgoForDaSeat

### **Second Semester Final Project for Design and Analysis of Algorithms**
Solving real-world problems using algorithms:
Assigning students to limited slots in public schools based on proximity, performance, and social criteria is a common challenge every enrollment season.

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

```
AlgoForDaSeat/
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── db.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   └── client/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   │   └── Login.vue
│       │   ├── views/
│       │   ├── App.vue
│       │   ├── main.js
│       │   └── styles.css
│       ├── index.html
│       ├── vite.config.js
│       └── package.json
│
├── README.md
└── .gitignore
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
