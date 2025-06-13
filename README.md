# AlgoForDaSeat
Second Semester Final Project for Design and Analysis of Algorithms. Solving real world problems using algorithms. 

Backend
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

Frontend
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

