const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: { type: Number, required: true },
  lastDonationDate: { type: Date },
  medicalHistory: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Donor', donorSchema);
