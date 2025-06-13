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
      CREATE TABLE IF NOT EXISTS application (
        user_id SERIAL PRIMARY KEY,
        full_name VARCHAR(50) NOT NULL,
        address VARCHAR(255) NOT NULL,
        gpa NUMERIC(10,2),
        school_attended VARCHAR(80) NOT NULL,
        exam_score INTEGER,
        proximity NUMERIC(10,2)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS waitlisted (
        user_id SERIAL PRIMARY KEY,
        full_name VARCHAR(50) NOT NULL,
        school_attended VARCHAR(80) NOT NULL,
        gpa NUMERIC(10,2),
        exam_score INTEGER,
        status VARCHAR(20) NOT NULL,
        actions VARCHAR(20) NOT NULL
      );
    `);

    console.log("✅ All tables created successfully!");
  })
  .catch(err => console.error("Error creating tables", err));

module.exports = pool;