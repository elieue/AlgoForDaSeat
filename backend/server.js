const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const applicantRoutes = require("./routes/applicantRoutes");
const applicationResultsRoutes = require("./routes/applicationResultsRoutes");
const { pool, fetchStudents } = require("./db");
const { initializeHashTable, getHashTable } = require('./data/hashSingleton'); // ✅
const { seed } = require('./seed_applications');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicantRoutes);
app.use("/api/applications", applicationResultsRoutes);

// Test DB connection
pool.query("SELECT 1")
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Database connection error:", err));

// Initialize hash table once at startup
(async () => {
  await seed(); // Seed the database with random records
  await initializeHashTable(fetchStudents); // Now initialize the hash table
})();

// Allocation logic
app.get("/allocate-seats", async (req, res) => {
  try {
    await pool.query("SELECT allocate_seats()");
    const result = await pool.query("SELECT * FROM student_selection");
    res.json(result.rows);
  } catch (error) {
    console.error("Error allocating seats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get individual student from in-memory hash table
app.get("/student/:id", (req, res) => {
  const hashTable = getHashTable(); // Pull from singleton
  const studentId = req.params.id;
  const student = hashTable.get(studentId);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

// Serve frontend files
const frontendPath = path.join(__dirname, "..", "frontend", "client", "dist");
app.use(express.static(frontendPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
