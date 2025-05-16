const express = require('express');                   // Import express library to build the router
const router = express.Router();                      // new router instance for auth-related routes
const authCtrl = require('../controllers/auth');      // Import controller that has the login logic

router.get('/login', authCtrl.showLoginForm);         // Route to show login form (GET /login)

router.post('/login', authCtrl.login);                // Route to handle login form submission (POST /login)

module.exports = router;                              // Export router for use in server.js