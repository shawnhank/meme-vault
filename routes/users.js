const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
const favoritesCtrl = require('../controllers/favorites');
const { isLoggedIn } = require('../middleware/auth');

router.get('/community', isLoggedIn, usersCtrl.listUsers);
router.get('/:id/favorites', isLoggedIn, favoritesCtrl.index);
router.get('/:id/edit', isLoggedIn, usersCtrl.editProfileForm);
router.put('/:id', isLoggedIn, usersCtrl.updateProfile);
router.get(
  '/:id/change-password',
  isLoggedIn,
  usersCtrl.showChangePasswordForm
);
router.put('/:id/change-password', isLoggedIn, usersCtrl.updatePassword);
router.get('/:id', isLoggedIn, usersCtrl.showProfile);

module.exports = router;
