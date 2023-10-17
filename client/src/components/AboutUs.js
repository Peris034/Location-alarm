import React from 'react';
import './AboutUs.css';

function About() {
  const authors = [
    {
      name: "Peris Gajera",
      bio: "A MERN stack developer",
      imageUrl: "/images/peris.png",
    },
    {
      name: "Vatsal Gandhi",
      bio: "Database Administrator",
      imageUrl: "/images/vatsal.jpg",
    },
  ];

  return (
    <div className="abus">
      <h1>About Us</h1>
      <div className="about-us">
        {authors.map(author => (
          <div key={author.name} className="author">
            <h2>{author.name}</h2>
            <img src={author.imageUrl} alt={author.name} />
            <p>{author.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
