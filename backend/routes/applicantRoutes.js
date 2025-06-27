const express = require('express');
const router = express.Router();
const { getHashTable } = require('../data/hashSingleton');
const { allocateSlots } = require('../controllers/slotAllocationController');

// Get all applications
router.get('/all', (req, res) => {
  const hashTable = getHashTable();
  if (!hashTable) {
    return res.status(500).json({ error: 'Hash table not initialized' });
  }
  const allStudents = hashTable.getAll();
  res.json(allStudents);
});

// Get applications by status
router.get('/status/:status', (req, res) => {
  const hashTable = getHashTable();
  if (!hashTable) {
    return res.status(500).json({ error: 'Hash table not initialized' });
  }
  const status = req.params.status.toLowerCase();
  const allStudents = hashTable.getAll();
  const filteredStudents = allStudents.filter(student => 
    student.status && student.status.toLowerCase() === status
  );
  res.json(filteredStudents);
});

// Get pending applications
router.get('/pending', (req, res) => {
  const hashTable = getHashTable();
  if (!hashTable) {
    return res.status(500).json({ error: 'Hash table not initialized' });
  }
  const allStudents = hashTable.getAll();
  const pendingStudents = allStudents.filter(student => 
    student.status && student.status.toLowerCase() === 'pending'
  );
  res.json(pendingStudents);
});

// Get application statistics
router.get('/stats', (req, res) => {
  const hashTable = getHashTable();
  if (!hashTable) {
    return res.status(500).json({ error: 'Hash table not initialized' });
  }
  const allStudents = hashTable.getAll();
  const stats = {
    total: allStudents.length,
    admitted: allStudents.filter(s => s.status === 'admitted').length,
    rejected: allStudents.filter(s => s.status === 'rejected').length,
    waitlisted: allStudents.filter(s => s.status === 'waitlisted').length,
    pending: allStudents.filter(s => s.status === 'pending').length
  };
  res.json(stats);
});

// Get individual application by ID
router.get('/:id', (req, res) => {
  const hashTable = getHashTable();
  if (!hashTable) {
    return res.status(500).json({ error: 'Hash table not initialized' });
  }
  const student = hashTable.get(req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Application not found' });
  }
  res.json(student);
});

// Slot allocation endpoint
router.post('/allocate', allocateSlots);

// Debug route to check hash table statuses
router.get('/debug/statuses', (req, res) => {
  const hashTable = getHashTable();
  if (!hashTable) {
    return res.status(500).json({ error: 'Hash table not initialized' });
  }
  const allStudents = hashTable.getAll();
  const statusCounts = {};
  allStudents.forEach(student => {
    const status = student.status || 'unknown';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });
  res.json({
    totalStudents: allStudents.length,
    statusCounts,
    students: allStudents.map(s => ({
      id: s.application_id,
      name: s.full_name,
      status: s.status || 'unknown'
    }))
  });
});

// Test route to check specific status
router.get('/test/:status', (req, res) => {
  const hashTable = getHashTable();
  if (!hashTable) {
    return res.status(500).json({ error: 'Hash table not initialized' });
  }
  const status = req.params.status.toLowerCase();
  const allStudents = hashTable.getAll();
  const filteredStudents = allStudents.filter(student => 
    student.status && student.status.toLowerCase() === status
  );
  res.json({
    requestedStatus: status,
    foundCount: filteredStudents.length,
    students: filteredStudents.map(s => ({
      id: s.application_id,
      name: s.full_name,
      status: s.status,
      final_status: s.final_status
    }))
  });
});

module.exports = router;