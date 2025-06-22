const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const pool = require('../../db');

// Get admin profile
router.get('/', auth, async (req, res) => {
    try {
        const adminId = req.admin.admin_id;
          const query = `
            SELECT first_name, last_name, email, contact_number 
            FROM admins 
            WHERE admin_id = $1
        `;
        
        const result = await pool.query(query, [adminId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'admin not found' });
        }

        const admin = result.rows[0];
          res.json({
            firstName: admin.first_name,
            lastName: admin.last_name,
            email: admin.email,
            contactNumber: admin.contact_number,
        });
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update admin profile
router.put('/', auth, async (req, res) => {
    try {
        const adminId = req.admin.admin_id;
        const { firstName, lastName, email, contactNumber } = req.body;

        // Validate input
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if email is already taken by another admin
        const emailCheck = await pool.query(
            'SELECT admin_id FROM admins WHERE email = $1 AND admin_id != $2',
            [email, adminId]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Email is already in use' });
        }        const query = `
            UPDATE admins 
            SET first_name = $1, last_name = $2, email = $3, contact_number = $4
            WHERE admin_id = $5
            RETURNING first_name, last_name, email, contact_number
        `;

        const result = await pool.query(query, [
            firstName,
            lastName,
            email,
            contactNumber,
            adminId
        ]);

        const updatedadmin = result.rows[0];
        
        res.json({
            firstName: updatedadmin.first_name,
            lastName: updatedadmin.last_name,
            email: updatedadmin.email,
            contactNumber: updatedadmin.contact_number
        });
    } catch (error) {
        console.error('Error updating admin profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;