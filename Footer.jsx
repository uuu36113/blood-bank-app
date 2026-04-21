import { Droplet, Heart, MapPin, Mail, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <Droplet className="logo-icon" size={24} />
            <span>LifeSource</span>
          </div>
          <p>Connecting patients in need with generous life-saving donors nationwide. Your donation is a gift of life.</p>
        </div>
        
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/search">Find Blood</a></li>
            <li><a href="/register-donor">Become a Donor</a></li>
            <li><a href="/help">Help Center</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li><Phone size={16}/> +1 800-123-4567</li>
            <li><Mail size={16}/> emergency@lifesource.org</li>
            <li><MapPin size={16}/> 123 Health Ave, Medical District</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 LifeSource Blood Bank Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
