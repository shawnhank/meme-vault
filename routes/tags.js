const express = require('express');
const router = express.Router();
const tagsCtrl = require('../controllers/tags');

router.get('/', tagsCtrl.index);
router.get('/:name', tagsCtrl.show);

module.exports = router;
