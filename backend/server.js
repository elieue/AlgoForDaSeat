const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const { allocateAndBuildHashTable, getStudentById } = require("./services/allocator"); // ✅ NEW

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);

// ✅ API: Allocation using CSV logic and Ford-Fulkerson
app.get("/api/allocate", async (req, res) => {
  try {
    const { admitted, waitlisted, all } = await allocateAndBuildHashTable();
    res.json({ admitted, waitlisted, all });
  } catch (err) {
    console.error("❌ Allocation failed:", err);
    res.status(500).json({ error: "Allocation failed" });
  }
});

// ✅ API: Search student by ID from hash table
app.get("/api/student/:id", (req, res) => {
  const student = getStudentById(req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

// Serve frontend (React/Vite/etc.)
const frontendPath = path.join(__dirname, "..", "frontend", "client", "dist");
app.use(express.static(frontendPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
