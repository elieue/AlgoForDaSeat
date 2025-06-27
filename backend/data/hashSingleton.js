let hashTable;

const { StudentHashTable } = require('../utils/studentHashTable');
const { normalizeObjects } = require('../utils/normalizer');

async function initializeHashTable(fetchStudents) {
  const rawStudents = await fetchStudents();
  hashTable = new StudentHashTable();
  for (const raw of rawStudents) {
    const student = normalizeObjects(raw);
    hashTable.insert(student.application_id, student);
  }
  console.log("HashTable initialized in memory");
}

function getHashTable() {
  return hashTable;
}

module.exports = { initializeHashTable, getHashTable };
