const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const pool = require("./db");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);

pool.query("SELECT 1")
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Database connection error:", err));

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

const frontendPath = path.join(__dirname, "..", "frontend", "client", "dist");
app.use(express.static(frontendPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${5173}`);
});