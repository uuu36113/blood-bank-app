const express = require('express');
const router = express.Router();
const { searchBlood } = require('../controllers/searchController');

router.get('/', searchBlood);

module.exports = router;
