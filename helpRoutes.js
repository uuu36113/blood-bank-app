const express = require('express');
const router = express.Router();
const { askHelp } = require('../controllers/helpController');

router.post('/', askHelp);

module.exports = router;
