const express = require('express');
const router = express.Router();
const favoritesCtrl = require('../controllers/favorites');
const { isLoggedIn } = require('../middleware/auth');

router.post('/:id/favorite', isLoggedIn, favoritesCtrl.create);
router.delete('/:id/favorite', isLoggedIn, favoritesCtrl.remove);

module.exports = router;
