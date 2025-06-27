const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const pool = require("./db");
const { runHashSeeder } = require("./scripts/hashSeeder"); // ✅ Seeder
const { StudentHashTable } = require("./utils/studentHashTable");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// 🔐 API Routes
app.use("/api/auth", authRoutes);

// 🧠 Create shared hash table (in-memory only)
const hashTable = new StudentHashTable();

// ✅ Database Connectivity Test
pool.query("SELECT 1")
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Database connection error:", err));

// 🪄 Seeder logic on server start
(async () => {
  try {
    console.log("⏳ Running hash seeder...");
    await runHashSeeder(hashTable);
    console.log("✅ Hash table is seeded and ready.");
  } catch (err) {
    console.error("❌ Seeder Error:", err.message);
  }
})();

// 🚀 Allocation endpoint (via PostgreSQL stored function)
app.get("/allocate-seats", async (req, res) => {
  try {
    await pool.query("SELECT allocate_seats()");
    const result = await pool.query("SELECT * FROM student_selection");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error allocating seats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔍 HashTable lookup endpoint
app.get("/student/:id", (req, res) => {
  const studentId = req.params.id;
  const student = hashTable.get(studentId);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

// 🧾 Serve Frontend (e.g. Vite build output)
const frontendPath = path.join(__dirname, "..", "frontend", "client", "dist");
app.use(express.static(frontendPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// 🌐 Start Server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
