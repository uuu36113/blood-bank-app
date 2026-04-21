import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import api from '../api';
import './Auth.css';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    bloodGroup: '',
    location: '',
    pincode: '',
    diseases: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phone,
        bloodGroup: formData.bloodGroup,
        location: formData.location,
        pincode: formData.pincode,
        previousDiseases: formData.diseases
      });
      alert('Registration Successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-page container">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-icon"><UserPlus size={32} /></div>
          <h2>Patient / Receiver Registration</h2>
          <p>Create an account to request blood during emergencies.</p>
        </div>

        {error && <div className="alert alert-danger" style={{color: 'red', marginBottom: '15px'}}>{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" className="form-control" placeholder="John Doe" required onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" className="form-control" placeholder="+1 234 567 890" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" className="form-control" placeholder="john@example.com" required onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Blood Group</label>
              <select name="bloodGroup" className="form-control" required onChange={handleChange}>
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="form-group">
              <label>Pincode / Zip</label>
              <input type="text" name="pincode" className="form-control" placeholder="10001" required onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Location / Address</label>
            <input type="text" name="location" className="form-control" placeholder="123 Main St, City, Country" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Previous Diseases (if any)</label>
            <textarea name="diseases" className="form-control" rows="2" placeholder="Asthma, Diabetes..." onChange={handleChange}></textarea>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" placeholder="••••••••" required onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary btn-full">Register Account</button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
