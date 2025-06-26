const CSVHandler = require('../utils/csv_handler');
const CountingSort = require('../algorithms/counting_sort');
const StudentHashTable = require('../algorithms/hash_tracker');
const runFordFulkerson = require('../algorithms/ford_fulkerson');

const NEAR_MANILA_CITIES = [
  'Pasay City', 'Makati City', 'San Juan City', 'Mandaluyong City',
  'Caloocan City', 'Navotas City', 'Manila',
];

function computeScore({ gpa, exam, income, isIndigent, isNear }) {
  const gpaPts = (gpa / 100) * 30;
  const examPts = (exam / 100) * 40;
  const incomePts = income >= 300000 ? 0 : ((300000 - income) / 300000) * 20;
  const indigentPts = isIndigent ? 10 : 0;
  const proximityPts = isNear ? 10 : 0;
  const total = gpaPts + examPts + incomePts + indigentPts + proximityPts;
  return {
    gpaPts: +gpaPts.toFixed(2),
    examPts: +examPts.toFixed(2),
    incomePts: +incomePts.toFixed(2),
    indigentPts,
    proximityPts,
    total: +total.toFixed(2)
  };
}

let hashTable = null;

async function allocateAndBuildHashTable() {
  const studentsRaw = await CSVHandler.loadStudents('./data/students.csv');
  hashTable = new StudentHashTable(studentsRaw.length * 2);

  let students = studentsRaw.map((s, i) => {
    const gpa = parseFloat(s.gpa);
    const exam = parseFloat(s.entrance_exam_score);
    const income = parseFloat(s.parents_income);
    const isIndigent = s.is_indigent?.toLowerCase() === 'true' || s.is_indigent?.toLowerCase() === 'yes';
    const isNear = NEAR_MANILA_CITIES.some(city => s.address.includes(city));
    const score = computeScore({ gpa, exam, income, isIndigent, isNear });

    const student = {
      id: `S${i + 1}`,
      student_id: s.student_id,
      full_name: s.full_name,
      gpa, exam, income, isIndigent, isNear,
      address: s.address,
      ...score,
      final_status: 'PENDING'
    };

    hashTable.insert(student.student_id, student);
    return student;
  });

  students = CountingSort.sortByScore(students);

  const N = students.length;
  students.forEach((s, i) => {
    s.percentile = N === 1 ? 100 : Math.round(100 * (N - i - 1) / (N - 1));
  });

  const { admitted, waitlisted } = runFordFulkerson(students.slice(0, 15));
  admitted.forEach(s => hashTable.updateStatus(s.student_id, 'ADMITTED'));
  waitlisted.forEach(s => hashTable.updateStatus(s.student_id, 'WAITLISTED'));

  await CSVHandler.saveResults('./data/allocation_results.csv', hashTable.values());

  return {
    admitted,
    waitlisted,
    all: hashTable.values()
  };
}

function getStudentById(id) {
  return hashTable?.get(id) || null;
}

module.exports = {
  allocateAndBuildHashTable,
  getStudentById
};
