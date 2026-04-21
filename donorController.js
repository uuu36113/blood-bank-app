const Donor = require('../models/Donor');
const User = require('../models/User');

exports.registerDonor = async (req, res) => {
  try {
    const { age, lastDonationDate, medicalHistory, coordinates } = req.body;
    
    // Check if user is already a donor
    let donor = await Donor.findOne({ user: req.user.id });
    if (donor) {
      return res.status(400).json({ error: 'User is already registered as a donor' });
    }

    donor = new Donor({
      user: req.user.id,
      age,
      lastDonationDate,
      medicalHistory,
      coordinates
    });

    await donor.save();
    res.status(201).json({ message: 'Registered as donor successfully', donor });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.find().populate('user', '-password');
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
