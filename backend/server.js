const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const pool = require("./db"); // PostgreSQL connection

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// Database Connection Test
pool.query("SELECT 1")
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Database connection error:", err));

// 🚀 Add Seat Allocation API
app.get("/allocate-seats", async (req, res) => {
  try {
    await pool.query("SELECT allocate_seats()"); // Run allocation function
    const result = await pool.query("SELECT * FROM student_selection"); // Fetch selection results
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error allocating seats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Correct placement of homepage route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Start Server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${5173}`);
});
