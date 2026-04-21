import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import './Auth.css';

const DonorRegistration = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    age: '',
    lastDonation: '',
    history: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingLoc, setLoadingLoc] = useState(false);

  // If not logged in
  if (!user) {
    return (
      <div className="auth-page container" style={{textAlign: 'center', marginTop: '100px'}}>
        <h2>Please Login First</h2>
        <p>You must be a registered user to become a donor.</p>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>Login Now</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoadingLoc(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoadingLoc(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        await api.post('/donors', {
          age: formData.age,
          lastDonationDate: formData.lastDonation || null,
          medicalHistory: formData.history,
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
        setSuccess('Donor Registration Successful! Thank you for saving lives.');
        setLoadingLoc(false);
        setTimeout(() => navigate('/dashboard'), 2000);
      } catch (err) {
        setError(err.response?.data?.error || 'Registration failed');
        setLoadingLoc(false);
      }
    }, () => {
      setError("Unable to retrieve your location. Please allow location access.");
      setLoadingLoc(false);
    });
  };

  return (
    <div className="auth-page container">
      <div className="auth-container donor-theme">
        <div className="auth-header">
          <div className="auth-icon donor-icon"><HeartPulse size={32} /></div>
          <h2>Become a Donor</h2>
          <p>Your blood can save up to 3 lives. Register to become a donor.</p>
        </div>

        {error && <div className="alert alert-danger" style={{color: 'red', marginBottom: '15px'}}>{error}</div>}
        {success && <div className="alert alert-success" style={{color: 'green', marginBottom: '15px'}}>{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Current Status: Logged in as <strong>{user.fullName}</strong></label>
          </div>

          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" className="form-control" min="18" max="65" placeholder="Must be 18-65" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Last Donation Date</label>
            <input type="date" name="lastDonation" className="form-control" onChange={handleChange} />
            <small>Leave blank if first time</small>
          </div>

          <div className="form-group">
            <label>Medical History / Current Medications</label>
            <textarea name="history" className="form-control" rows="3" placeholder="List any chronic conditions or daily medications..." required onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loadingLoc}>
            {loadingLoc ? 'Fetching Location & Registering...' : 'Register as Donor'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorRegistration;
