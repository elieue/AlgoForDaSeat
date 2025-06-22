const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, admin) => {
        if (err) {
            return res.status(403).json({ error: 'Access denied. Invalid token.' });
        }
        
        req.admin = admin;
        next();
    });
}

module.exports = authenticateAdmin;