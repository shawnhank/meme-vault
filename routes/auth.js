const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

router.get('/register', authCtrl.showRegisterForm);
router.post('/register', authCtrl.register);
router.get('/login', authCtrl.showLoginForm);
router.post('/login', authCtrl.login);

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/?loggedOut=true');
  });
});

module.exports = router;
