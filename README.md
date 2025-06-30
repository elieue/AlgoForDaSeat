# AlgoForDaSeat

### **Second Semester Final Project for Design and Analysis of Algorithms**

Solving real-world problems using algorithms:

- Assigning students to limited slots in public schools based on proximity, performance, and social criteria is a common challenge every enrollment season.

## **Project Overview**

-AlgoForDaSeat is a web-based administrative system designed to support the fair and efficient allocation of limited slots in public schools. The project addresses the increasing demand for accessible tertiary education in the Philippines, where thousands of students compete for a small number of available seats. The system aims to assist school administrators in managing application records and making informed decisions regarding student admissions.


To guide the structure and logic of the system, several algorithmic concepts were incorporated. Counting Sort was considered for ranking applicants based on priority metrics, ensuring quick and stable sorting of large datasets. Breadth-First Search (BFS) inspired the handling of location-based factors such as student proximity, while Ford-Fulkerson informed the idea of allocating limited resources—like school slots—without exceeding capacity. Additionally, Hashing was used to support fast and efficient access to student records stored in a PostgreSQL database.


The outcome is a responsive, admin-only platform where application data is generated and reviewed through a secure dashboard. While the system does not automate decision-making, it offers a structured environment that reflects the principles of fairness, efficiency, and accessibility in public school admissions.

---

## **🖥️ Tech Stack**

- **Frontend**: Vue.js, Vue Router, Pinia (State Management)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT

---

## **📁 Folder Structure**

```
AlgoForDaSeat/
AlgoForDaSeat/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   └── proximityController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   └── proximityRoutes.js
│   ├── models/
│   │   └── studentModel.js
│   ├── utils/
│   │   ├── proximity-bfs.js
│   │   └── seedHelpers.js
│   ├── seed/
│   │   └── generate-student-data.js
│   ├── db.js
│   ├── server.js
│   ├── .env
│   └── package.json

├── frontend/
│   └── client/
│       ├── public/
│       │   └── index.html
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   │   ├── Login.vue
│       │   │   ├── StudentTable.vue
│       │   │   └── ScoreBreakdown.vue
│       │   ├── views/
│       │   │   ├── Home.vue
│       │   │   └── Results.vue
│       │   ├── App.vue
│       │   ├── main.js
│       │   └── styles/
│       │       └── main.css
│       ├── vite.config.js
│       └── package.json
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

## 🚀 Installation & Setup

### 1. Clone the Repository

```powershell
git clone https://github.com/elieue/AlgoForDaSeat.git
cd AlgoForDaSeat
```

### 2. Database Setup

1. **Install PostgreSQL** if not already installed
2. **Create a new database** named `algofordaseat` (note: different from previous versions)
3. **Update database configuration** in `backend/db.js` with your credentials:

```javascript
const pool = new Pool({
  user: 'your_username',        // Your PostgreSQL username
  host: 'localhost',
  database: 'algofordaseat',        // Database name
  password: 'your_password',    // Your PostgreSQL password
  port: 5432,                   // Default PostgreSQL port
});
```

### 3. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Initialize database tables
node db.js

# Seed the database with sample data
node seed_rooms.js

# Start the backend server
node server.js
```

The backend server will start on `http://localhost:3000`

### 4. Frontend Setup

Open a new terminal window:

```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start Backend Server:**
   ```powershell
   cd backend
   node server.js
   ```

2. **Start Frontend Development Server:**
   ```powershell
   cd frontend
   npm run dev
   ```

3. **Access the Application:**
   - **Frontend**: `http://localhost:5173`
   - **Backend API**: `http://localhost:3000`

### Production Build

```powershell
# Build frontend for production
cd frontend
npm run build

# Preview production build
npm run preview
```
