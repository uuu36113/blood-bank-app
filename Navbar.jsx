import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplet, Menu, X, PhoneCall, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import EmergencyModal from './EmergencyModal';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          <Link to="/" className="navbar-logo">
            <Droplet className="logo-icon" size={28} />
            <span>LifeSource Blood Bank</span>
          </Link>
          
          <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/search" className="nav-link" onClick={() => setIsOpen(false)}>Find Blood</Link>
            {user && <Link to="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>Dashboard</Link>}
            <Link to="/help" className="nav-link" onClick={() => setIsOpen(false)}>Help Center</Link>
            
            {!user ? (
              <Link to="/login" className="nav-link mobile-only" onClick={() => setIsOpen(false)}>Login</Link>
            ) : (
              <button className="nav-link mobile-only" onClick={handleLogout} style={{background:'none', border:'none', textAlign:'left', padding:'1rem'}}>Logout</button>
            )}
          </div>

          <div className="nav-actions">
            <button className="btn btn-emergency nav-emergency" onClick={() => setShowEmergency(true)}>
              <PhoneCall size={18} />
              <span className="hide-mobile">Emergency</span>
            </button>
            
            {!user ? (
              <Link to="/login" className="btn btn-primary hide-mobile">Login</Link>
            ) : (
              <div className="hide-mobile" style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <span style={{fontWeight:'500', display:'flex', alignItems:'center', gap:'5px'}}>
                  <User size={18} /> {user.fullName.split(' ')[0]}
                </span>
                <button onClick={handleLogout} className="btn btn-outline" style={{padding:'8px 15px'}}>Logout</button>
              </div>
            )}
            
            <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Render the Emergency Modal here so it can overlay everything */}
      <EmergencyModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
    </>
  );
};

export default Navbar;
