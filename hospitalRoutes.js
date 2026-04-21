const express = require('express');
const router = express.Router();
const { getHospitals, addHospital } = require('../controllers/hospitalController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getHospitals);
// Temporarily allowed without auth for seeding testing, or we can use admin middleware
router.post('/', addHospital);

module.exports = router;
