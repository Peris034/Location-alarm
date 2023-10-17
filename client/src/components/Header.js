import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ isAuthenticated, handleLogout }) {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/dashboard" className="navLink">Home</Link>
        <Link to="/locationinput" className="navLink">Location</Link>
        <Link to="/contact" className="navLink">Contact</Link>
        <Link to="/about" className="navLink">About Us</Link>
        {isAuthenticated && <Link to="/profileuser" className="navLink">Profile</Link>}
        {!isAuthenticated && <Link to="/signin" className="navLink">Login</Link>}
        {!isAuthenticated && <Link to="/signup" className="navLink">Signup</Link>}
        {isAuthenticated && <button onClick={handleLogout} className="navLink">Logout</button>}
      </nav>
    </header>
  );
}

export default Header;


//localStorage.removeItem('user');
//const user = JSON.parse(localStorage.getItem('user'));
