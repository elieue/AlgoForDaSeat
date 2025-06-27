const { Pool } = require('pg');
const { getCityDistanceBFS, parseCityFromAddress, calculateProximityGrade } = require('./bfs_proximity');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'algofordaseat',
  password: 'Fantastic_Best0113',
  port: 5432,
});

const ADMIT_SLOTS = 10;
const WAITLIST_SLOTS = 5;

function computeScore({ gpa, exam, income, isIndigent, address }) {
  const gpaPts = (gpa / 100) * 30;
  const examPts = (exam / 100) * 40;
  const incomePts = income >= 300000 ? 0 : ((300000 - income) / 300000) * 20;
  const indigentPts = isIndigent ? 10 : 0;
  
  // Use BFS to calculate proximity score
  const fromCity = parseCityFromAddress(address);
  const toCity = 'Manila'; // Assuming Manila is the target city
  const distance = getCityDistanceBFS(fromCity, toCity);
  const proximityPts = calculateProximityGrade(distance);
  
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

function countingSortByTotalScore(students) {
  // students: [{ total: number, ... }]
  // Find max score
  const maxScore = Math.max(...students.map(s => s.total));
  const minScore = Math.min(...students.map(s => s.total));
  const range = Math.round(maxScore - minScore) + 1;
  const count = Array(range).fill(0);
  const output = Array(students.length);

  // Count occurrences
  for (const s of students) {
    count[Math.round(s.total - minScore)]++;
  }
  // Cumulative count
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  // Build output array (stable sort, descending)
  for (let i = students.length - 1; i >= 0; i--) {
    const s = students[i];
    const idx = Math.round(s.total - minScore);
    output[count[idx] - 1] = s;
    count[idx]--;
  }
  // Reverse for descending order
  return output.reverse();
}

function allocateSlotsWithCountingSort(students) {
  // Use counting sort for efficient ranking
  const sortedStudents = countingSortByTotalScore(students.map(s => ({ ...s, total: s.score.total })));
  
  const admitted = sortedStudents.slice(0, ADMIT_SLOTS).map((s, index) => ({
    ...s,
    status: 'admitted',
    rank: index + 1
  }));
  
  const waitlisted = sortedStudents.slice(ADMIT_SLOTS, ADMIT_SLOTS + WAITLIST_SLOTS).map((s, index) => ({
    ...s,
    status: 'waitlisted',
    rank: ADMIT_SLOTS + index + 1
  }));
  
  const rejected = sortedStudents.slice(ADMIT_SLOTS + WAITLIST_SLOTS).map((s, index) => ({
    ...s,
    status: 'rejected',
    rank: ADMIT_SLOTS + WAITLIST_SLOTS + index + 1
  }));
  
  return {
    admitted,
    waitlisted,
    rejected,
    totalProcessed: students.length
  };
}

module.exports = {
  computeScore,
  countingSortByTotalScore,
  allocateSlotsWithCountingSort,
  ADMIT_SLOTS,
  WAITLIST_SLOTS
};
