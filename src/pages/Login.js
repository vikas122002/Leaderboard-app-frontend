import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    navigate('/');
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">✅</div>
        <h2>Welcome Back</h2>
        <p>Sign in to your To-Do account</p>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        <p className="switch-auth">Don't have an account? <span onClick={() => navigate('/register')}>Go to Register</span></p>
      </div>
    </div>
  );
}

export default Login;
