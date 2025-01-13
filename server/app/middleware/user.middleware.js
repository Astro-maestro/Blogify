// middleware/userMiddleware.js
const userMiddleware = (req, res, next) => {
    console.log('Session data:', req.session);
    console.log("req.user: ",req.user); 
    // Check if user is authenticated
    if (req.user) {
        res.locals.user = req.session.user; // Set user data in locals
        console.log("res.locals.user:", res.locals.user);
    } else {
        res.locals.user = null; // No user is logged in
    }
    next(); // Call the next middleware
};

module.exports = userMiddleware;