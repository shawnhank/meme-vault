const express = require('express');                 // Load Express
const router = express.Router();                    // Create the router
const usersCtrl = require('../controllers/users');  // Import the users controller

// GET /users/new → Show new user form
router.get('/new', usersCtrl.showNewUserForm);

// GET /community → Show all users in the app
router.get('/community', usersCtrl.listUsers);      // List all users with links to their profiles

// GET /users/:id → Show a single user's profile and their memes
router.get('/:id', usersCtrl.showProfile);          // Load selected user + their memes

module.exports = router;                            // Export router to use in server.js