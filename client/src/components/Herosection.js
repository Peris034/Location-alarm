import React from 'react';
import './Herosection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='videos/home.mp4' autoPlay loop muted />
      <h1>Find the distance from destination</h1>
      <p>What are you waiting for?</p>
    </div>
  );
}

export default HeroSection;