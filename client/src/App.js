import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Profileuser from './components/Profileuser';
import Signin from './components/Signin';
import About from './components/AboutUs';
import LocationInput from './components/LocationInput';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userIsAuthenticated = document.cookie.includes('authenticated=true');
    setIsAuthenticated(userIsAuthenticated);
  }, []);  

  const handleLogout = () => {
    document.cookie = "authenticated=false";
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/locationinput" element={<LocationInput />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/about" element={<About/>} />
          {!isAuthenticated && <Route path="/signin" element={<Signin />} />}
          {!isAuthenticated && <Route path="/signup" element={<Signup />} />}
          {isAuthenticated && <Route path="/profileuser" element={<Profileuser isAuthenticated={isAuthenticated} />} />}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
