const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const resultsDir = path.join(__dirname, '..', 'data', 'allocation_results');

router.get('/admitted', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(resultsDir, 'admitted.json'), 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Could not read admitted.json' });
  }
});

router.get('/waitlisted', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(resultsDir, 'waitlisted.json'), 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Could not read waitlisted.json' });
  }
});

router.get('/rejected', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(resultsDir, 'rejected.json'), 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Could not read rejected.json' });
  }
});

module.exports = router; 