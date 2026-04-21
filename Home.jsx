import { Link } from 'react-router-dom';
import { Search, HeartPulse, Activity, Users, Droplets, MapPin } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Donate Blood, <br/><span className="highlight">Save Lives</span></h1>
            <p>Every drop counts. Join our community of life-savers today and make a difference that lasts a lifetime. Your simple act can bring hope to those in need.</p>
            <div className="hero-actions">
              <Link to="/register-donor" className="btn btn-primary btn-lg">
                <HeartPulse size={20} />
                Become a Donor
              </Link>
              <Link to="/search" className="btn btn-outline btn-lg">
                <Search size={20} />
                Search Blood
              </Link>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-shape"></div>
            <img 
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800" 
              alt="Blood Donation" 
              className="hero-image" 
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper blood-icon">
              <Droplets size={32} />
            </div>
            <div className="stat-info">
              <h3>15,234</h3>
              <p>Units Collected</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper user-icon">
              <Users size={32} />
            </div>
            <div className="stat-info">
              <h3>8,541</h3>
              <p>Registered Donors</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper heart-icon">
              <Activity size={32} />
            </div>
            <div className="stat-info">
              <h3>12,050</h3>
              <p>Lives Saved</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper location-icon">
              <MapPin size={32} />
            </div>
            <div className="stat-info">
              <h3>45</h3>
              <p>Active Centers</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Informational Banner */}
      <section className="info-banner container">
        <div className="info-box">
          <h2>Why Donate Blood?</h2>
          <p>Blood is the most precious gift that anyone can give to another person - the gift of life. A decision to donate your blood can save a life, or even several if your blood is separated into its components.</p>
          <Link to="/about" className="link-arrow">Learn More About Donation &rarr;</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
