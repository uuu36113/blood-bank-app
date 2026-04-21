const Hospital = require('../models/Hospital');
const Donor = require('../models/Donor');

// Haversine formula to calculate distance between two coordinates in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;  
  const dLon = (lon2 - lon1) * Math.PI / 180; 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

exports.searchBlood = async (req, res) => {
  try {
    const { bloodGroup, lat, lng } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Please provide lat and lng parameters' });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    // Get all hospitals and donors
    const hospitals = await Hospital.find({});
    // For donors, we would fetch User info as well to match blood group
    const donors = await Donor.find({ status: 'active' }).populate('user', 'fullName phoneNumber bloodGroup');

    // Filter hospitals
    const availableHospitals = hospitals.filter(h => {
      // In production, we assume exact match on key e.g., h.availableBloodGroups['A+'] > 0
      if (bloodGroup) {
        return h.availableBloodGroups && h.availableBloodGroups[bloodGroup] > 0;
      }
      return true;
    }).map(h => {
      const distance = calculateDistance(latitude, longitude, h.coordinates.latitude, h.coordinates.longitude);
      return { ...h.toObject(), distance, type: 'hospital' };
    });

    // Filter donors
    const availableDonors = donors.filter(d => {
      if (bloodGroup) {
        return d.user && d.user.bloodGroup === bloodGroup;
      }
      return d.user;
    }).map(d => {
      const distance = calculateDistance(latitude, longitude, d.coordinates.latitude, d.coordinates.longitude);
      return { 
        id: d._id,
        name: d.user.fullName,
        phone: d.user.phoneNumber,
        bloodGroup: d.user.bloodGroup,
        distance,
        type: 'donor',
        coordinates: d.coordinates
      };
    });

    // Combine and sort by distance
    let allResults = [...availableHospitals, ...availableDonors];
    allResults.sort((a, b) => a.distance - b.distance);

    let results = [];
    let message = '';

    const within5km = allResults.filter(item => item.distance <= 5);
    
    if (within5km.length > 0) {
      results = within5km;
    } else {
      const within20km = allResults.filter(item => item.distance <= 20);
      if (within20km.length > 0) {
        results = within20km;
        message = 'No hospitals within 5km. Expanding search to 20km.';
      } else {
        if (allResults.length > 0) {
          results = allResults.slice(0, 5);
          message = 'No hospitals within 5km. Showing nearest available options.';
        } else {
          message = 'No nearby hospitals found. Showing closest available hospitals.';
        }
      }
    }

    res.json({ results, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
