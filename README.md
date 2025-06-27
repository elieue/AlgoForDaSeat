# AlgoForDaSeat

### **Second Semester Final Project for Design and Analysis of Algorithms**
Solving real-world problems using algorithms:
- Assigning students to limited slots in public schools based on proximity, performance, and social criteria is a common challenge every enrollment season.

## **Project Overview**
-AlgoForDaSeat is a web-based administrative system designed to support the fair and efficient allocation of limited slots in public schools. The project addresses the increasing demand for accessible tertiary education in the Philippines, where thousands of students compete for a small number of available seats. The system aims to assist school administrators in managing application records and making informed decisions regarding student admissions.
-To guide the structure and logic of the system, several algorithmic concepts were incorporated. Counting Sort was considered for ranking applicants based on priority metrics, ensuring quick and stable sorting of large datasets. Breadth-First Search (BFS) inspired the handling of location-based factors such as student proximity, while Ford-Fulkerson informed the idea of allocating limited resources—like school slots—without exceeding capacity. Additionally, Hashing was used to support fast and efficient access to student records stored in a PostgreSQL database.
-The outcome is a responsive, admin-only platform where application data is generated and reviewed through a secure dashboard. While the system does not automate decision-making, it offers a structured environment that reflects the principles of fairness, efficiency, and accessibility in public school admissions.


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
git clone https://github.com/elieue/AlgoForDaSeat.git

### **1️⃣ Backend Setup**
```sh
cd backend
npm install
npm start
node server.js
node db.js
node ford_fulkerson.js
node counting_sort.js
```

### **1️⃣ Frontend Setup**
```sh
cd frontend
npm install
npm run dev
```
