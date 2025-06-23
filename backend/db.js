const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'algofordaseat',
  password: 'DL-160_diplomat',
  port: 5432,
});

pool.connect()
  .then(async () => {
    // Create student applications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS student_applications (
        applicantion_id SERIAL PRIMARY KEY,
        full_name TEXT,
        email TEXT,
        student_id BIGINT,
        gpa NUMERIC(4, 2),
        entrance_exam_score INTEGER,
        city TEXT,
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
        user_id VARCHAR(20) REFERENCES student_applications(user_id) ON DELETE CASCADE,
        school_attended TEXT,
        gpa NUMERIC(10,2),
        exam_score INTEGER,
        submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

     await pool.query(`
      CREATE TABLE IF NOT EXISTS student_rankings (
        user_id VARCHAR(20) REFERENCES student_applications(user_id) ON DELETE CASCADE,
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

module.exports = pool;
