import { ShieldCheck, Clock, Heart } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header container">
        <h1>About the System</h1>
        <p>A smart, efficient, and life-saving Blood Bank Management System designed to bridge the gap between donors and patients.</p>
      </div>

      <div className="container about-content">
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" alt="Laboratory Testing" />
        </div>
        
        <div className="about-text">
          <h2>What is a Blood Bank Management System?</h2>
          <p>
            An Online Blood Bank Management System is an architecture designed to automate and simplify the processes of a blood blank, including blood storage tracking, donor details management, blood requests, and emergency dispatching.
          </p>
          <p>
            The primary goal is to provide a seamless connection between individuals facing emergencies and willing donors in the vicinity. With real-time inventory tracking, hospitals can ensure they never run out of crucial blood groups.
          </p>

          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon"><ShieldCheck size={24}/></div>
              <div>
                <h3>Secure & Reliable</h3>
                <p>Advanced security measures to protect donor privacy and patient data at all times.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Clock size={24}/></div>
              <div>
                <h3>Real-Time Tracking</h3>
                <p>Hospitals update their stock instantly, so users always see accurate blood availability.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Heart size={24}/></div>
              <div>
                <h3>Save Lives Faster</h3>
                <p>Location-based search ensures the fastest possible connection during critical emergencies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
