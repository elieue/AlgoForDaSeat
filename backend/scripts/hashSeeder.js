const { fetchStudents } = require('../server/db');
const { StudentHashTable } = require('../utils/studentHashTable');
const { normalizeStudent } = require('../utils/normalizeKeys');

async function runSeeder() {
  try {
    const rawStudents = await fetchStudents();
    const hashTable = new StudentHashTable();

    for (const rawStudent of rawStudents) {
      const student = normalizeStudent(rawStudent);
      hashTable.insert(student);
    }

    console.log('\n✅ Seeder finished. Final hash table:');
    hashTable.display();
  } catch (error) {
    console.error('Seeder failed:', error.message);
  }
}

runSeeder();
