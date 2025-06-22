const express = require('express');
const router = express.Router();
const { registeradmin, loginadmin } = require('../controllers/authController');

router.post('/register', registeradmin);
router.post('/login', loginadmin);

module.exports = router;