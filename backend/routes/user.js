const express = require("express");
const { getUser, updateUser } = require("../controllers/userController");

const router = express.Router();

// Get user profile
router.get("/:id", getUser);

// Update user profile
router.put("/:id", updateUser);

module.exports = router;