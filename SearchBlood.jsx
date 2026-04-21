import { useState, useEffect } from 'react';
import { Search, MapPin, Droplet, PhoneCall, Navigation, ExternalLink } from 'lucide-react';
import api from '../api';
import './SearchBlood.css';

const SearchBlood = () => {
  const [filters, setFilters] = useState({ group: '' });
  const [locationCoords, setLocationCoords] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    setError('');
    navigator.geolocation.getCurrentPosition((position) => {
      setLocationCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }, () => {
      setError("Unable to retrieve your location. Please allow location access.");
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!locationCoords) {
      setError('Please click "Detect Location" first or allow location access.');
      return;
    }
    if (!filters.group) {
      setError('Please select a blood group.');
      return;
    }

    setLoading(true);
    setError('');
    setSearchMessage('');
    try {
      const res = await api.get(`/search?bloodGroup=${encodeURIComponent(filters.group)}&lat=${locationCoords.lat}&lng=${locationCoords.lng}`);
      setResults(res.data.results || []);
      setSearchMessage(res.data.message || '');
      setHasSearched(true);
    } catch (err) {
      setError('Failed to fetch search results.');
    }
    setLoading(false);
  };

  return (
    <div className="search-page container">
      <div className="page-header">
        <h1>Find Blood Donors</h1>
        <p>Search for available donors and hospitals matched by blood group within a 5km radius.</p>
      </div>

      <div className="search-widget" style={{maxWidth: '800px'}}>
        {error && <div className="alert alert-danger" style={{color: 'red', marginBottom: '15px'}}>{error}</div>}
        
        <form onSubmit={handleSearch} className="search-form" style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
          <div className="search-input-group" style={{flex: 1}}>
            <Droplet className="input-icon" size={20} />
            <select 
              className="search-input" 
              required
              onChange={(e) => setFilters({...filters, group: e.target.value})}
            >
              <option value="">Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="search-input-group" style={{flex: 1, backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', cursor: 'pointer'}} onClick={getLocation}>
            <Navigation className="input-icon" size={20} style={{color: '#16a34a'}}/>
            <input 
              type="button" 
              className="search-input" 
              style={{cursor: 'pointer', textAlign: 'left', backgroundColor: 'transparent'}}
              value={locationCoords ? `Location Detected (${locationCoords.lat.toFixed(2)}, ${locationCoords.lng.toFixed(2)})` : "Detecting Location..."} 
            />
          </div>

          <button type="submit" className="btn btn-primary search-btn" disabled={loading}>
            <Search size={20} />
            {loading ? 'Searching...' : 'Find Match'}
          </button>
        </form>
      </div>

      <div className="results-container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h3 className="results-title" style={{margin: 0}}>Search Results</h3>
        </div>
        
        {!hasSearched && !loading && (
          <p>Please perform a search to see nearby donors and hospitals.</p>
        )}

        {hasSearched && searchMessage && !loading && (
          <div className="alert alert-warning" style={{backgroundColor: '#fffbeb', color: '#b45309', padding: '15px', borderRadius: '8px', border: '1px solid #fcd34d', marginBottom: '15px'}}>
            {searchMessage}
          </div>
        )}

        {hasSearched && results.length === 0 && !searchMessage && !loading && (
          <div className="alert alert-warning" style={{backgroundColor: '#fffbeb', color: '#b45309', padding: '15px', borderRadius: '8px', border: '1px solid #fcd34d', marginBottom: '15px'}}>
            No nearby donors/hospitals found. Try expanding your search or selecting a different blood group.
          </div>
        )}

        {results.length > 0 && (
          <div className="donors-grid">
            {results.map((item, index) => (
              <div className={`donor-card ${item.status === 'inactive' ? 'unavailable' : ''}`} key={index}>
                <div className="donor-card-header">
                  <div className="donor-group-badge">{item.type === 'hospital' ? 'Hospital' : item.bloodGroup}</div>
                  <div className="donor-status">{item.status || 'Available'}</div>
                </div>
                <div className="donor-info">
                  <h4>{item.name}</h4>
                  <p className="donor-location">
                    <MapPin size={16} /> {item.type === 'hospital' ? 'Hospital' : 'Donor Profile'}
                  </p>
                  <p className="donor-distance">{(item.distance).toFixed(2)} km away</p>
                  
                  {item.coordinates && (
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${item.coordinates.latitude},${item.coordinates.longitude}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={{color: '#2563eb', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '14px', marginTop: '5px', fontWeight: '500'}}
                    >
                      <ExternalLink size={14} /> Get Directions
                    </a>
                  )}
                </div>
                <div className="donor-card-footer">
                  <button 
                    className="btn btn-primary btn-full request-btn"
                    disabled={item.status === 'inactive'}
                    onClick={() => alert(`Contacting: ${item.name}\nPhone: ${item.contactNumber || item.phone || 'N/A'}`)}
                  >
                    <PhoneCall size={18} /> Contact: {item.contactNumber || item.phone || 'N/A'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchBlood;
