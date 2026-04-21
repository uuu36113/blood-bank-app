import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import UserRegistration from './pages/UserRegistration';
import DonorRegistration from './pages/DonorRegistration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SearchBlood from './pages/SearchBlood';
import HelpCenter from './pages/HelpCenter';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register-user" element={<UserRegistration />} />
              <Route path="/register-donor" element={<DonorRegistration />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/search" element={<SearchBlood />} />
              <Route path="/help" element={<HelpCenter />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
