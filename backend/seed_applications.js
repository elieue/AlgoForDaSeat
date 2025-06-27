const { faker } = require('@faker-js/faker');
const { Pool } = require('pg');

// Helper to generate a random date string
function getRandomDate() {
  const start = new Date('2025-01-01');
  const end = new Date('2025-04-30');
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString()
    .replace('T', ' ')
    .split('.')[0];
}

// Database connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'algofordaseat',
  password: 'DL-160_diplomat',
  port: 5432
});

const cities = [
  'Caloocan City', 'Las Piñas City', 'Makati City', 'Malabon City', 'Mandaluyong City',
  'Manila', 'Marikina City', 'Muntinlupa City', 'Navotas City', 'Parañaque City',
  'Pasay City', 'Pasig City', 'Quezon City', 'San Juan City', 'Taguig City', 'Valenzuela City'
];

const schools = [
  'Manila Science High School', 'Quezon City Science High School', 'Pasig City Science High School',
  'Taguig Science High School', 'Makati Science High School', 'Marikina Science High School',
  'San Juan City National Science High School', 'Las Piñas City National Senior High School',
  'Navotas National High School', 'Caloocan National Science and Technology High School',
  'Mandaluyong High School', 'Malabon National High School',
  'Valenzuela City School of Mathematics and Science', 'Parañaque National High School',
  'Jose Abad Santos High School', 'Ramon Magsaysay High School', 'Manuel A. Roxas High School',
  'Victorino Mapa High School', 'Timoteo Paez Integrated High School', 'Lagro High School'
];

const emailProviders = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'protonmail.com'];

async function seed() {
  const client = await pool.connect();
  try {
    // --- FIX 1: Create the table if it doesn't exist ---
    // This runs before any other query, ensuring the table is ready.
    await client.query(`
      CREATE TABLE IF NOT EXISTS student_applications (
        application_id VARCHAR(50) PRIMARY KEY,
        full_name VARCHAR(255),
        email VARCHAR(255),
        lrn VARCHAR(20),
        gpa NUMERIC(4, 2),
        entrance_exam_score INT,
        address TEXT,
        proximity NUMERIC(5, 2),
        gender VARCHAR(20),
        ethnicity VARCHAR(50),
        age INT,
        school_attended VARCHAR(255),
        parent_mother VARCHAR(255),
        parent_father VARCHAR(255),
        parents_income NUMERIC(10, 2),
        economic_status VARCHAR(50),
        itr_or_indigent VARCHAR(100),
        submission_date TIMESTAMP,
        application_status VARCHAR(50) DEFAULT 'Pending',
        reason_for_decision TEXT
      );
    `);
    console.log('✅ Table "student_applications" is ready.');

    const lrnSchoolMap = {};

    // Clear table to avoid issues on re-running the seed script
    await client.query('DELETE FROM student_applications');
    console.log('🗑️  Cleared existing data from "student_applications".');

    // Loop to generate and insert 100 fake student applications
    for (let i = 1; i <= 100; i++) {
      const lastName = faker.person.lastName().replace(/'/g, "''");
      const firstName = faker.person.firstName().replace(/'/g, "''");
      const fullName = `${firstName} ${lastName}`;
      const userId = `STU${i.toString().padStart(3, '0')}`;
      const mother = `${faker.person.firstName().replace(/'/g, "''")} ${lastName}`;
      const father = `${faker.person.firstName().replace(/'/g, "''")} ${lastName}`;
      const income = faker.number.int({ min: 50000, max: 300000 });
      const status = income < 100000 ? 'Lower' : income < 200000 ? 'Middle' : 'Upper';
      const isIndigent = status === 'Lower' ? 'Indigent (4ps,PhilHealth, DSWD, PWD, Solo Parent, IPs)' : 'Not Indigent (ITR)';

      let lrn;
      if (Math.random() < 0.2 && Object.keys(lrnSchoolMap).length > 0) {
        const existingLrns = Object.keys(lrnSchoolMap);
        lrn = existingLrns[Math.floor(Math.random() * existingLrns.length)];
      } else {
        lrn = faker.number.int({ min: 130000000000, max: 199999999999 }).toString();
        lrnSchoolMap[lrn] = faker.helpers.arrayElement(schools);
      }

      const school = lrnSchoolMap[lrn];
      const city = faker.helpers.arrayElement(cities);
      const fullAddress = `${faker.location.streetAddress()}, ${city}`;

      await client.query(
        `INSERT INTO student_applications(
          application_id, full_name, email, lrn, gpa, entrance_exam_score, address, proximity,
          gender, ethnicity, age, school_attended, parent_mother, parent_father, parents_income,
          economic_status, itr_or_indigent, submission_date
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8,
          $9, $10, $11, $12, $13, $14, $15,
          $16, $17, $18
        )`,
        [
          userId,
          fullName,
          `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${faker.helpers.arrayElement(emailProviders)}`,
          lrn,
          Number((85 + Math.random() * 10).toFixed(2)),
          faker.number.int({ min: 80, max: 99 }),
          fullAddress,
          Number((3 + Math.random() * 10).toFixed(2)),
          faker.helpers.arrayElement(['Male', 'Female']),
          'Tagalog',
          faker.number.int({ min: 17, max: 20 }),
          school,
          mother,
          father,
          income,
          status,
          isIndigent,
          getRandomDate()
        ]
      );
    }

    console.log(`✅ Successfully inserted 100 records into "student_applications".`);

  } catch (err) {
    console.error('❌ Seeding script error:', err);
  } finally {
    // This is crucial. It releases the client back to the pool so other parts
    // of your application can use it.
    client.release();
    // --- FIX 2: Removed `await pool.end()` ---
    // We do not end the pool here, as the main server still needs it.
  }
}

module.exports = { seed };
