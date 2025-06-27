const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'algofordaseat',
  password: 'Fantastic_Best0113',
  port: 5432,
});

pool.connect()
  .then(async () => {
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

    console.log("✅ All tables and functions created successfully!");
  })
  .catch(err => console.error("Error creating tables", err));

  async function fetchStudents() {
  const res = await pool.query('SELECT * FROM student_applications');
  return res.rows;
}

module.exports = { pool, fetchStudents };
