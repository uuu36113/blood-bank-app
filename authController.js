const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, bloodGroup, location, pincode, previousDiseases, role } = req.body;
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    user = new User({
      fullName, email, password: hashedPassword, phoneNumber, bloodGroup, location, pincode, previousDiseases, role
    });
    
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET || 'supersecretkey_change_in_production', 
      { expiresIn: '1d' }
    );
    
    res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role, bloodGroup: user.bloodGroup } });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
