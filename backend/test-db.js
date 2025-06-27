const { pool, fetchStudents } = require('./db');

async function testDatabase() {
  console.log('🧪 Testing Database Connection...\n');

  try {
    // Test basic connection
    console.log('1. Testing database connection...');
    const result = await pool.query('SELECT 1 as test');
    console.log('✅ Database connection successful:', result.rows[0]);

    // Test if tables exist
    console.log('\n2. Testing table existence...');
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('student_applications', 'student_selection', 'student_rankings')
    `);
    console.log('✅ Found tables:', tablesResult.rows.map(row => row.table_name));

    // Test fetching students
    console.log('\n3. Testing fetchStudents function...');
    const students = await fetchStudents();
    console.log(`✅ Found ${students.length} students in database`);

    if (students.length > 0) {
      console.log('Sample student data:', students[0]);
    }

    console.log('\n🎉 Database test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.error('Please check:');
    console.error('1. PostgreSQL is running');
    console.error('2. Database "algofordaseat" exists');
    console.error('3. User "postgres" has access');
    console.error('4. Password is correct');
  } finally {
    await pool.end();
  }
}

testDatabase(); 