import { useState, useEffect } from 'react';
import { X, PhoneCall, AlertTriangle, MapPin, Loader2 } from 'lucide-react';
import './EmergencyModal.css';

const EmergencyModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [numbers, setNumbers] = useState({ ambulance: '112', police: '911' });

  useEffect(() => {
    if (isOpen) {
      fetchEmergencyInfo();
    } else {
      // reset
      setLoading(false);
      setError('');
      setLocationData(null);
    }
  }, [isOpen]);

  const fetchEmergencyInfo = () => {
    setLoading(true);
    setError('');
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser. Defaulting to standard emergency numbers.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          if (!res.ok) throw new Error("Failed to fetch location data");
          const data = await res.json();
          
          const countryCode = data.address?.country_code?.toLowerCase();
          setLocationData(data.address);
          
          // Basic mapping
          if (countryCode === 'in') {
            setNumbers({ ambulance: '108', police: '100' });
          } else if (countryCode === 'us' || countryCode === 'ca') {
            setNumbers({ ambulance: '911', police: '911' });
          } else if (countryCode === 'gb') {
            setNumbers({ ambulance: '999', police: '101' });
          } else if (countryCode === 'au') {
            setNumbers({ ambulance: '000', police: '131444' });
          } else {
            setNumbers({ ambulance: '112', police: '911' });
          }
        } catch (err) {
          console.error(err);
          setError("Could not determine your country. Showing default numbers.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Location permission denied. Showing default international numbers.");
        setLoading(false);
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content emergency-modal">
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        
        <div className="modal-header">
          <AlertTriangle size={32} color="#dc2626" />
          <h2>Emergency Contacts</h2>
        </div>

        <div className="modal-body">
          {loading ? (
            <div className="loading-state">
              <Loader2 className="spinner" size={24} />
              <p>Detecting your location...</p>
            </div>
          ) : (
            <>
              {error && <div className="alert alert-warning">{error}</div>}
              
              {locationData && (
                <div className="location-info">
                  <MapPin size={18} />
                  <span>Your Location: <strong>{locationData.country} {locationData.state ? `(${locationData.state})` : ''}</strong></span>
                </div>
              )}

              <div className="numbers-grid">
                <a href={`tel:${numbers.ambulance}`} className="emergency-card ambulance-card">
                  <PhoneCall size={28} />
                  <div className="contact-details">
                    <span className="contact-type">Ambulance / Medical</span>
                    <span className="number-display">{numbers.ambulance}</span>
                  </div>
                </a>

                <a href={`tel:${numbers.police}`} className="emergency-card police-card">
                  <PhoneCall size={28} />
                  <div className="contact-details">
                    <span className="contact-type">Police</span>
                    <span className="number-display">{numbers.police}</span>
                  </div>
                </a>
              </div>
              
              <p className="helper-text">Tap a card to auto-dial from your mobile device.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyModal;
