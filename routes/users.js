const express = require('express'); // Load Express
const router = express.Router(); // Create the router
const usersCtrl = require('../controllers/users'); // Import the users controller
const favoritesCtrl = require('../controllers/favorites'); // Import the favorites controller
const { isLoggedIn } = require('../middleware/auth'); // to prevent a visitor from editing a form directly

// GET /community → Show all users in the app
router.get('/community', isLoggedIn, usersCtrl.listUsers); // List all users with links to their profiles

// GET /users/:id/favorites → Show a list of memes this user has favorited
router.get('/:id/favorites', isLoggedIn, favoritesCtrl.index);

// GET /users/:id/edit → Show profile edit form
router.get('/:id/edit', isLoggedIn, usersCtrl.editProfileForm);

// PUT /users/:id → Save profile edits
router.put('/:id', isLoggedIn, usersCtrl.updateProfile);

// GET /users/:id/change-password → Show change password form
router.get(
  '/:id/change-password',
  isLoggedIn,
  usersCtrl.showChangePasswordForm
);

// PUT /users/:id/change-password → Handle password update
router.put('/:id/change-password', isLoggedIn, usersCtrl.updatePassword);

// GET /users/:id → Show a single user's profile and their memes
router.get('/:id', isLoggedIn, usersCtrl.showProfile); // Load selected user + their memes

module.exports = router; // Export router to use in server.js
