const express = require('express');
const UserController = require('../../../modules/user/controllers/api/user.controller');
const authenticateToken = require('../../../middleware/authenticate.middleware'); // Middleware to authenticate JWT
const router = express.Router();
const uploadSingleImage = require('../../../helper/UploadSingleImage.helper');
const passport = require('passport');
const Token = require('../../../modules/user/models/user.model');


const FRONTEND_URL = process.env.FRONTEND_BASE_URL


router.post('/register', uploadSingleImage.single('image'), UserController.register);
router.get("/confirmation/:email/:token", UserController.confirmation);
router.post('/login', UserController.login);
router.put('/updatePassword', authenticateToken, UserController.updatePassword);
router.get('/dashboard', authenticateToken, UserController.dashboard);
router.post('/logout', authenticateToken, UserController.logout);
router.post("/forgotPassword", UserController.forgotPassword);
router.put("/resetPassword/:token", UserController.resetPassword);
router.get('/getAllUsers', authenticateToken, UserController.getAllUsers);
router.get('/getRolebasedUsers', authenticateToken, UserController.getRoleBasedUsers);
router.patch('/updateUser/:userId',authenticateToken, uploadSingleImage.single('image'), UserController.updateUser);

// Initiate Google login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Handle Google login callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
  async (req, res) => {
    const user = req.user;
    
    console.log('Authenticated user:', req.user);
    const userToken = await Token.findOne({ email: req.user.email });

    if (!userToken) {
      return res.status(404).json({ error: "Token not found for user" });
    }

    // Set the token as a cookie
    res.cookie("token", userToken.token, {
      secure: false,
    });
    res.cookie('user', JSON.stringify(user), {
      secure: false,
    });
    res.redirect('http://localhost:3000/dashboard'); // Redirect after successful login
  }
);

// Logout route for Google User Account
router.post('/auth/logout/google', (req, res) => {
  // Clear the cookies (token and user)
  res.clearCookie('token', { secure: false });
  res.clearCookie('user', { secure: false });

  // Send a response indicating successful logout
  res.status(200).json({ message: 'Logged out successfully' });
});




module.exports = router;