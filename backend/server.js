const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const applicantRoutes = require("./routes/applicantRoutes");
const applicationResultsRoutes = require("./routes/applicationResultsRoutes");

// Database & Seeder Imports
const { pool, fetchStudents } = require("./db"); // CORRECTED PATH: Removed /utils
const { initializeHashTable, getHashTable } = require('./data/hashSingleton');
const { seed } = require('./seed_applications');
const { runHashSeeder } = require('./scripts/hashSeeder');

// --- Initialization ---
dotenv.config();
const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicantRoutes);
// Note: To avoid route conflicts, consider a more specific path for results if needed,
// for example: app.use("/api/results", applicationResultsRoutes);
app.use("/api/applications", applicationResultsRoutes);


// --- Server Startup Sequence ---
// We create a single async function to control the startup order.
// This prevents race conditions where one step starts before another is finished.
const startServer = async () => {
  try {
    // Step 1: Verify database connection
    await pool.query("SELECT 1");
    console.log("✅ Successfully connected to PostgreSQL.");

    // Step 2: Seed the database with initial application records.
    // This must happen before we try to read from it.
    console.log("⏳ Seeding database...");
    await seed();
    console.log("✅ Database seeding complete.");

    // Step 3: Fetch students from the now-seeded database and initialize the hash table.
    console.log("⏳ Initializing in-memory student hash table...");
    await initializeHashTable(fetchStudents);
    console.log("✅ Student hash table initialized.");

    // Step 4 (Optional): Run the hash seeder script if it performs additional logic.
    // We get the hashTable from the singleton AFTER it has been initialized.
    console.log("⏳ Running hash seeder script...");
    const hashTable = getHashTable();
    await runHashSeeder(hashTable); // Pass the retrieved hash table
    console.log("✅ Hash table is seeded and ready.");

    // Step 5: Start the Express server only AFTER all setup is complete.
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is live and running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Fatal error during server startup:", err);
    process.exit(1); // Exit the process with an error code
  }
};


// --- Additional API Endpoints ---
// This endpoint was in your original file.
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

// This endpoint was in your original file for testing the hash table.
app.get("/student/:id", (req, res) => {
  const hashTable = getHashTable();
  const studentId = req.params.id;
  const student = hashTable.get(studentId);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});


// --- Frontend Serving (for production) ---
// This serves your built frontend from the backend.
const frontendPath = path.join(__dirname, "..", "frontend", "dist"); // Corrected path
app.use(express.static(frontendPath));

// This is a catch-all to serve index.html for any non-API route, allowing client-side routing to work.
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


// --- GO! ---
// Execute the startup function to get everything running.
startServer();
