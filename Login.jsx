import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(formData.email, formData.password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.msg);
    }
  };

  return (
    <div className="auth-page container">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-icon"><LogIn size={32} /></div>
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
        </div>

        {error && <div className="alert alert-danger" style={{color: 'red', marginBottom: '15px'}}>{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" className="form-control" placeholder="john@example.com" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" placeholder="••••••••" required onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary btn-full">Login</button>
        </form>
        <p style={{marginTop: '20px', textAlign: 'center'}}>
          Don't have an account? <Link to="/register-user">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
