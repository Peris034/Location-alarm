import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import './AuthBox.css';

function Signup() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputBackgroundu, setInputBackgroundu] = useState('rgba(221, 255, 2, 0.272)');
  const [inputBackground, setInputBackground] = useState('rgba(221, 255, 2, 0.272)');
  const [inputBackgrounduu, setInputBackgrounduu] = useState('rgba(221, 255, 2, 0.272)');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response);
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({
          username: '',
          email: '',
          password: ''
        });
        setIsLoggedIn(true);
        // Assuming 'userData' is the object received from the server after successful login
        localStorage.setItem('user', JSON.stringify(formData));

        document.cookie = "authenticated=true";
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  if (isLoggedIn) {
    navigate('/dashboard');
  }
  return (
    <div class="hero">
      <div className="container">
        <div className="box">
          <div className="row">
            <div className="register">
              Register
            </div>
            <div className="login" onClick={() => navigate('/signin')}>
              Login
            </div>
          </div>
          <form className='login-form' onSubmit={handleSubmit} method='post'>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              onFocus={() => setInputBackground('rgba(255, 2, 192, 0.272)')}
              onBlur={() => setInputBackground('rgba(221, 255, 2, 0.272)')}
              style={{ backgroundColor: inputBackground }}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setInputBackgroundu('rgba(255, 2, 192, 0.272)')}
              onBlur={() => setInputBackgroundu('rgba(221, 255, 2, 0.272)')}
              style={{ backgroundColor: inputBackgroundu }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => setInputBackgrounduu('rgba(255, 2, 192, 0.272)')}
              onBlur={() => setInputBackgrounduu('rgba(221, 255, 2, 0.272)')}
              style={{ backgroundColor: inputBackgrounduu }}
            />
            <button type="submit">Sign Up</button>
          </form>
          <p>Already registered? <span class="login-link" onClick={() => navigate('/signin')}>Login Here</span>.</p>
        </div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
      </div>
    </div>
  );
}

export default Signup;
