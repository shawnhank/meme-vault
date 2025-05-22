const express = require('express');
const router = express.Router();
const favoritesCtrl = require('../controllers/favorites');
const { isLoggedIn } = require('../middleware/auth');

// Add a meme to favorites
router.post('/:id/favorite', isLoggedIn, favoritesCtrl.create);

// Remove a meme from favorites
router.delete('/:id/favorite', isLoggedIn, favoritesCtrl.remove);

module.exports = router;