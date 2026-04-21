const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Route imports
const authRoutes = require('./routes/authRoutes');
const donorRoutes = require('./routes/donorRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const searchRoutes = require('./routes/searchRoutes');
const helpRoutes = require('./routes/helpRoutes');
const Hospital = require('./models/Hospital'); // For seeding

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/help', helpRoutes);

// Seed function
const seedHospitals = async () => {
  const count = await Hospital.countDocuments();
  if (count === 0) {
    console.log('Seeding initial dummy hospitals...');
    await Hospital.insertMany([
      { name: 'City General Hospital', contactNumber: '123-456-7890', coordinates: { latitude: 28.6139, longitude: 77.2090 }, availableBloodGroups: { 'A+': 5, 'B+': 2, 'O+': 10, 'O-': 1 } },
      { name: 'Metro Care Clinic', contactNumber: '098-765-4321', coordinates: { latitude: 28.5355, longitude: 77.3910 }, availableBloodGroups: { 'A+': 0, 'B+': 5, 'AB+': 2, 'O+': 5 } },
      { name: 'National Health Institute', contactNumber: '111-222-3333', coordinates: { latitude: 28.4595, longitude: 77.0266 }, availableBloodGroups: { 'B-': 1, 'AB-': 2, 'O-': 3, 'A-': 0 } }
    ]);
  }
};

// Database Connection
const connectDB = async () => {
  try {
    // Try to connect to local MongoDB with a short timeout
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bloodbank', { serverSelectionTimeoutMS: 2000 });
    console.log('MongoDB Connected (Local/Remote)');
    await seedHospitals();
  } catch (err) {
    console.log('Local MongoDB not accessible. Switching to In-Memory MongoDB...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log('In-Memory MongoDB Connected');
      await seedHospitals();
    } catch (memErr) {
      console.error('Failed to start In-Memory MongoDB:', memErr);
    }
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
