const express = require('express');
const router = express.Router();
const memesCtrl = require('../controllers/memes');
const { isLoggedIn } = require('../middleware/auth'); // to prevent a visitor from adding, editing, deleting memes

// Index – GET /memes
router.get('/', memesCtrl.index);

router.get('/mine', isLoggedIn, memesCtrl.myMemes);

// New – GET /memes/new
router.get('/new', isLoggedIn, memesCtrl.newForm);

// Create – POST /memes
router.post('/', isLoggedIn, memesCtrl.create);

// Show – GET /memes/:id
router.get('/:id', memesCtrl.show);

// Edit – GET /memes/:id/edit
router.get('/:id/edit', isLoggedIn, memesCtrl.editForm);

// Update – PUT /memes/:id
router.put('/:id', isLoggedIn, memesCtrl.update);

// Delete – DELETE /memes/:id
router.delete('/:id', isLoggedIn, memesCtrl.destroy);

module.exports = router;