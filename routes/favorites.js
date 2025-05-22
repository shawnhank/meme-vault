const express = require('express');
const router = express.Router();
const favoritesCtrl = require('../controllers/favorites');
const { isLoggedIn } = require('../middleware/auth');

// Add a meme to favorites
router.post('/:id/favorite', isLoggedIn, favoritesCtrl.create);

// Remove a meme from favorites
router.delete('/:id/favorite', isLoggedIn, favoritesCtrl.remove);

// View all favorites for a user
router.get('/users/:userId/favorites', isLoggedIn, favoritesCtrl.index);

module.exports = router;