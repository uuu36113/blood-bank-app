const Hospital = require('../models/Hospital');

exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addHospital = async (req, res) => {
  try {
    // Basic implementation, in production should check admin role
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json(hospital);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
