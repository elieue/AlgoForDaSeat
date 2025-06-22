const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, admin) => {
        if (err) return res.sendStatus(403);
        req.admin = admin;
        next();
    });
}

module.exports = authenticateToken;