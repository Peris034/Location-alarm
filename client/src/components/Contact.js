import React, { useState } from 'react';
import './Contact.css'; 

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send data to server)
    console.log('Form submitted:', formData);
    // Reset form fields
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contactUsContainer">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter Your Name'
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter Your Email'
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder='Enter Message here....'
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
