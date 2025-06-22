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
    user_id TEXT PRIMARY KEY,
    full_name TEXT,
    email TEXT,
    student_id BIGINT,
    gpa NUMERIC(4, 2),
    entrance_exam_score INTEGER,
    address TEXT,
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
        applicant_id VARCHAR(20) PRIMARY KEY,
        exam_score INTEGER,
        gpa NUMERIC(10,2),
        proximity NUMERIC(5,2),
        economic_status INTEGER,
        decision VARCHAR(10) CHECK (decision IN ('pass', 'waitlist', 'reject'))
      );
    `);

    // Create selection function
    await pool.query(`
      CREATE OR REPLACE FUNCTION allocate_seats()
      RETURNS VOID AS $$
      DECLARE
        total_passers INTEGER := 0;
        total_waitlist INTEGER := 0;
        student RECORD;
      BEGIN
        FOR student IN 
          SELECT user_id, entrance_exam_score, gpa, proximity, economic_status,
                (entrance_exam_score * 0.4 + gpa * 0.3 + (1/proximity) * 0.2 + (10/economic_status) * 0.1) AS weight_score
          FROM student_applications 
          ORDER BY weight_score DESC
          LIMIT 100
        LOOP
          IF total_passers < 10 THEN
            INSERT INTO student_selection VALUES (student.user_id, student.entrance_exam_score, student.gpa, student.proximity, student.economic_status, student.weight_score, 'pass');
            total_passers := total_passers + 1;
          ELSIF total_waitlist < 3 THEN
            INSERT INTO student_selection VALUES (student.user_id, student.entrance_exam_score, student.gpa, student.proximity, student.economic_status, student.weight_score, 'waitlist');
            total_waitlist := total_waitlist + 1;
          ELSE
            INSERT INTO student_selection VALUES (student.user_id, student.entrance_exam_score, student.gpa, student.proximity, student.economic_status, student.weight_score, 'reject');
          END IF;
        END LOOP;
      END;
      $$ LANGUAGE plpgsql;
    `);

    console.log("✅ All tables and functions created successfully!");
  })
  .catch(err => console.error("Error creating tables", err));

module.exports = pool;
