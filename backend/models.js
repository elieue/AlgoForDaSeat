const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'padayondb',
  password: 'red572943816', // Replace with your actual password
  port: 5432,
});

client.connect()
  .then(async () => {
    // Users table
    await client.query(`

    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL
    );

`);

    console.log("✅ All tables created successfully with single table approach!");
    console.log("🎉 No more inheritance complexity - standard foreign keys work perfectly!");
  })
  .catch(err => console.error("Error creating tables", err));

module.exports = client;