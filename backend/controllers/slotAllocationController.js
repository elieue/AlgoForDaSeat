const { pool } = require('../db');
const { computeScore, countingSortByTotalScore } = require('../counting_sort');
const { getCityDistanceBFS, parseCityFromAddress, calculateProximityGrade } = require('../bfs_proximity');
const fs = require('fs').promises;
const path = require('path');
const { getHashTable } = require('../data/hashSingleton');
const ADMIT_SLOTS = 10;
const WAITLIST_SLOTS = 5;

async function allocateSlots(req, res) {
  try {
    // Fetch all students from DB (regardless of current status)
    const result = await pool.query(`
      SELECT application_id, full_name, gpa, entrance_exam_score, address, parents_income, itr_or_indigent
      FROM student_applications
    `);
    // 1. Score students using BFS proximity
    let students = result.rows.map((s, i) => {
      const gpa = parseFloat(s.gpa);
      const exam = parseFloat(s.entrance_exam_score);
      const income = parseFloat(s.parents_income);
      const isIndigent = s.itr_or_indigent?.toLowerCase().includes('indigent');
      const fromCity = parseCityFromAddress(s.address);
      const toCity = 'Manila';
      const distance = getCityDistanceBFS(fromCity, toCity);
      const proximityPts = calculateProximityGrade(distance);
      const score = computeScore({ gpa, exam, income, isIndigent, address: s.address });
      return {
        id: s.application_id,
        full_name: s.full_name,
        gpa, exam, income, isIndigent,
        address: s.address,
        score: score,
      };
    });

    // 2. Rank students using counting sort
    students = countingSortByTotalScore(students.map(s => ({ ...s, total: s.score.total })));

    // 3. Assign statuses (overwrite any previous status)
    const admitted = students.slice(0, ADMIT_SLOTS).map((s, i) => ({ ...s, status: 'admitted', rank: i + 1 }));
    const waitlisted = students.slice(ADMIT_SLOTS, ADMIT_SLOTS + WAITLIST_SLOTS).map((s, i) => ({ ...s, status: 'waitlisted', rank: ADMIT_SLOTS + i + 1 }));
    const rejected = students.slice(ADMIT_SLOTS + WAITLIST_SLOTS).map((s, i) => ({ ...s, status: 'rejected', rank: ADMIT_SLOTS + WAITLIST_SLOTS + i + 1 }));
    const allocations = [...admitted, ...waitlisted, ...rejected];

    // 4. Write results to separate JSON files
    const outputDir = path.join(__dirname, '..', 'data', 'allocation_results');
    
    // Create directory if it doesn't exist
    try {
      await fs.mkdir(outputDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.error('Error creating output directory:', err);
      }
    }

    // Write each category to its own JSON file
    await fs.writeFile(
      path.join(outputDir, 'admitted.json'),
      JSON.stringify(admitted, null, 2)
    );
    
    await fs.writeFile(
      path.join(outputDir, 'waitlisted.json'),
      JSON.stringify(waitlisted, null, 2)
    );
    
    await fs.writeFile(
      path.join(outputDir, 'rejected.json'),
      JSON.stringify(rejected, null, 2)
    );

    console.log(`Allocation results written to: ${outputDir}`);

    res.json({
      allocations,
      admitted,
      waitlisted,
      rejected,
      message: `Allocation completed. Results saved to ${outputDir}`
    });

    // 5. Update hash table with new statuses
    const hashTable = getHashTable();
    if (hashTable) {
      console.log(`🔄 Updating hash table with ${allocations.length} students`);
      allocations.forEach(student => {
        console.log(`  - Student ${student.id}: ${student.status}`);
        hashTable.updateStatus(student.id, student.status);
      });
      console.log('✅ Hash table updated with new statuses');
      hashTable.displayStatuses(); // Display updated statuses
    } else {
      console.log('❌ Hash table not available for update');
    }
  } catch (error) {
    console.error('Error in slot allocation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { allocateSlots }; 