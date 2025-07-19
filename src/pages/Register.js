import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

const handleRegister = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  try {
    await axios.post('http://localhost:5000/api/auth/register', {
      email,
      password,
      name: email.split('@')[0]
    });
    alert('Registration successful! Please login.');
    navigate('/login');
  } catch (err) {
    alert(err.response?.data?.message || 'Registration failed');
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">👤➕</div>
        <h2>Create Account</h2>
        <p>Sign up for a new To-Do account</p>
        <form onSubmit={handleRegister}>
          <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
        <p className="switch-auth">Already have an account? <span onClick={() => navigate('/login')}>Go to Login</span></p>
      </div>
    </div>
  );
}

export default Register;
