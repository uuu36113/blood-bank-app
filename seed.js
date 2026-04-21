const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hospital = require('./models/Hospital');

dotenv.config();

const hospitals = [
  {
    name: 'City General Hospital',
    contactNumber: '123-456-7890',
    coordinates: { latitude: 28.6139, longitude: 77.2090 }, // New Delhi example
    availableBloodGroups: { 'A+': 5, 'B+': 2, 'O+': 10, 'O-': 1 }
  },
  {
    name: 'Metro Care Clinic',
    contactNumber: '098-765-4321',
    coordinates: { latitude: 28.5355, longitude: 77.3910 }, // Noida example
    availableBloodGroups: { 'A+': 0, 'B+': 5, 'AB+': 2, 'O+': 5 }
  },
  {
    name: 'National Health Institute',
    contactNumber: '111-222-3333',
    coordinates: { latitude: 28.4595, longitude: 77.0266 }, // Gurgaon example
    availableBloodGroups: { 'B-': 1, 'AB-': 2, 'O-': 3, 'A-': 0 }
  }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bloodbank')
  .then(async () => {
    console.log('MongoDB Connected for Seeding');
    await Hospital.deleteMany(); // Clear existing
    await Hospital.insertMany(hospitals);
    console.log('Dummy Hospitals Seeded');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
