const express = require('express');                 // Load Express
const router = express.Router();                    // Create the router
const usersCtrl = require('../controllers/users');  // Import the users controller

// GET /community → Show all users in the app
router.get('/community', usersCtrl.listUsers);      // List all users with links to their profiles

// GET /users/:id/edit → Show profile edit form
router.get('/:id/edit', usersCtrl.editProfileForm);

// PUT /users/:id → Save profile edits
router.put('/:id', usersCtrl.updateProfile);

// GET /users/:id/change-password → Show change password form
router.get('/:id/change-password', usersCtrl.showChangePasswordForm);

// GET /users/:id → Show a single user's profile and their memes
router.get('/:id', usersCtrl.showProfile);          // Load selected user + their memes

module.exports = router;                            // Export router to use in server.js