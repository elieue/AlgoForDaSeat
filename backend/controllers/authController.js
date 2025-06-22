const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const registeradmin = async (req, res) => {
  const { name, email, password, contactNumber } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      "INSERT INTO admins (name, email, password, contact_number) VALUES ($1, $2, $3, $4)",
      [name, email, hashedPassword, contactNumber]
    );
    res.json({ message: "admin registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

const loginadmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
    if (admin.rows.length === 0) return res.status(404).json({ error: "admin not found" });

    const isMatch = await bcrypt.compare(password, admin.rows[0].password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: admin.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { registeradmin, loginadmin };