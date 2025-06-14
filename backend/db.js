const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'algofordaseat',
  password: 'DL-160_diplomat',
  port: 5432, //
});

pool.connect()
  .then(async () => {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS student_applications (
        user_id VARCHAR(20) PRIMARY KEY, -- Changed from SERIAL to VARCHAR(20) to support alphanumeric IDs like 'A1B2C3D4'
        full_name VARCHAR(100),
        email VARCHAR(100), -- Added to match your INSERT values
        student_id BIGINT, -- Added to match your INSERT values and handle 12-digit IDs
        gpa NUMERIC(4,2),
        entrance_exam_score INTEGER,
        address TEXT,
        proximity_to_school_km NUMERIC(5,2),
        parents_income NUMERIC(10,2),
        economic_status VARCHAR(10),
        itr_or_indigent VARCHAR(10),
        gender VARCHAR(10),
        ethnicity VARCHAR(30),
        age INTEGER,
        last_school_attended TEXT
      );
    `);

    console.log("✅ All tables created successfully!");
  })
  .catch(err => console.error("Error creating tables", err));

module.exports = pool;