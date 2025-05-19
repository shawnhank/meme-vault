const express = require('express');                 // Load Express
const router = express.Router();                    // Create the router
const usersCtrl = require('../controllers/users');  // Import the users controller

// GET /users/:id → Show a single user's profile and their memes
router.get('/:id', usersCtrl.showProfile);          // Map URL to controller function

module.exports = router;                            // Export router to use in server.js