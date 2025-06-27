const { seed } = require('../seed_applications');
const { fetchStudents } = require('../db');
const { normalizeObjects } = require('../utils/normalizer');

/**
 * Seeds the database and populates the given hash table.
 * @param {StudentHashTable} hashTable - The shared hash table to populate.
 */
async function runHashSeeder(hashTable) {
  try {
    await seed(); // Insert dummy student records into PostgreSQL

    const rawStudents = await fetchStudents(); // Fetch those students back
    
    for (const rawStudent of rawStudents) {
      const student = normalizeObjects(rawStudent); // Normalize structure
      hashTable.insert(student.application_id, student); // Insert using application_id as key
    }

    console.log('\n✅ Hash seeder complete. Final hash table:');
    hashTable.display();
  } catch (error) {
    console.error('❌ HashSeeder failed:', error.message);
  }
}

module.exports = { runHashSeeder };
