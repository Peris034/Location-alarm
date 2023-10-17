import React from 'react';
import './Home.css'; 
import LocationInput from './LocationInput.js';
import HeroSection from './Herosection';
import About from './AboutUs';
import Cards from './Cards'

function Dashboard() {
  return (
    <div className="homeContainer">
      {/* <h1>Home Page</h1> */}
      <HeroSection />
      <Cards />
      {/* < LocationInput />
      <br></br> */}
      <About />
    </div>
  );
}

export default Dashboard;
