const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'algofordaseat',
  password: process.env.DB_PASSWORD || 'Fantastic_Best0113',
  port: process.env.DB_PORT || 5432,
});

// Test the connection immediately
pool.connect()
  .then(async () => {
    console.log("Database connection established successfully!");
    
    // Create student applications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS student_applications (
        application_id VARCHAR(20) PRIMARY KEY,
        full_name TEXT,
        email TEXT,
        lrn BIGINT,
        gpa NUMERIC(4, 2),
        entrance_exam_score INTEGER,
        address VARCHAR(80),
        proximity NUMERIC(5, 2),
        gender TEXT,
        ethnicity TEXT,
        age INTEGER,
        school_attended TEXT,
        parent_mother TEXT,
        parent_father TEXT,
        parents_income INTEGER,
        economic_status TEXT,
        itr_or_indigent TEXT,
        final_status VARCHAR(20) DEFAULT 'pending',
        submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create selection table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS student_selection (
        application_id VARCHAR(20) REFERENCES student_applications(application_id) ON DELETE CASCADE,
        school_attended TEXT,
        gpa NUMERIC(10,2),
        exam_score INTEGER,
        submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

     await pool.query(`
      CREATE TABLE IF NOT EXISTS student_rankings (
        application_id VARCHAR(20) REFERENCES student_applications(application_id) ON DELETE CASCADE,
        full_name TEXT,
        email TEXT,
        student_id BIGINT,
        gpa NUMERIC(4, 2),
        entrance_exam_score INTEGER,
	      parents_income INTEGER,
        proximity NUMERIC(5, 2),
        decision VARCHAR(10) CHECK (decision IN ('pass', 'waitlist', 'reject'))
      );
    `);

    console.log("All tables created successfully!");
  })
  .catch(err => {
    console.error("Database connection error:", err.message);
    console.error("Please check your database configuration and ensure PostgreSQL is running.");
  });

async function fetchStudents() {
  try {
    const res = await pool.query('SELECT * FROM student_applications');
    return res.rows;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}

module.exports = { pool, fetchStudents };
