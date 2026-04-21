const express = require('express');
const router = express.Router();
const { registerDonor, getDonors } = require('../controllers/donorController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, registerDonor);
router.get('/', getDonors);

module.exports = router;
