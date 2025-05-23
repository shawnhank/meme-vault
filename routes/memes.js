const express = require('express');
const router = express.Router();
const memesCtrl = require('../controllers/memes');
const { isLoggedIn } = require('../middleware/auth');

router.get('/', memesCtrl.index);
router.get('/mine', isLoggedIn, memesCtrl.myMemes);
router.get('/new', isLoggedIn, memesCtrl.newForm);
router.post('/', isLoggedIn, memesCtrl.create);
router.get('/:id', memesCtrl.show);
router.get('/:id/edit', isLoggedIn, memesCtrl.editForm);
router.put('/:id', isLoggedIn, memesCtrl.update);
router.delete('/:id', isLoggedIn, memesCtrl.destroy);

module.exports = router;
