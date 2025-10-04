const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from headers
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // If no token is found, return a 401 Unauthorized response
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID from the token to the request object
        req.userId = decoded.id;
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // If the token is invalid or expired, return a 401 response
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
