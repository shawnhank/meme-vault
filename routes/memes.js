const express = require('express');
const router = express.Router();
const memesCtrl = require('../controllers/memes');

// Index – GET /memes
router.get('/', memesCtrl.index);

// New – GET /memes/new
router.get('/new', memesCtrl.newForm);

// Create – POST /memes
router.post('/', memesCtrl.create);

// Show – GET /memes/:id
router.get('/:id', memesCtrl.show);

// Edit – GET /memes/:id/edit
router.get('/:id/edit', memesCtrl.editForm);

// Update – PUT /memes/:id
router.put('/:id', memesCtrl.update);

// Delete – DELETE /memes/:id
router.delete('/:id', memesCtrl.destroy);

module.exports = router;