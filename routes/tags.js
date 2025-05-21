const express = require('express');
const router = express.Router();
const tagsCtrl = require('../controllers/tags');

// GET /tags → all tags
router.get('/', tagsCtrl.index);

// GET /tags/:name → memes with that tag
router.get('/:name', tagsCtrl.show);

module.exports = router;