const jwt = require('jsonwebtoken');

function authenticateBoth(req, res, next) {
  const token = req.headers['x-access-token'];

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden. Invalid token." });
    }

    // Check if the user role is 'admin'
    if (user.role !== "Admin" && user.role !== "Super Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Attach user info to request and proceed
    req.user = user;
    next();
  });
}

module.exports = authenticateBoth;