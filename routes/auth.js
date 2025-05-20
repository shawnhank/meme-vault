const express = require('express'); // Import express library to build the router
const router = express.Router(); // new router instance for auth-related routes
const authCtrl = require('../controllers/auth'); // Import controller that has the login logic

router.get('/register', authCtrl.showRegisterForm); // GET /register → Show user sign-up form

router.post('/register', authCtrl.register); // POST /register → Handle registration form submission

router.get('/login', authCtrl.showLoginForm); // Route to show login form (GET /login)

router.post('/login', authCtrl.login); // Route to handle login form submission (POST /login)

// GET /logout → Clear session and log the user out
router.post('/logout', (req, res) => {
  // Flash success message after logout
  req.flash('success', 'You have been logged out.');
  // Destroy the current session
  req.session.destroy(() => {
    // Redirect back to the homepage
    res.redirect('/');
  });
});

module.exports = router; // Export router for use in server.js
