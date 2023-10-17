import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Login.css';

function Logins () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      Cookies.set('loggedIn', 'true', { expires: 1 });
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    const loggedIn = Cookies.get('loggedIn');
    if (loggedIn === 'true') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="loginContainer">
      <h2>Login 2</h2>
      <form>
        <div>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Logins;


