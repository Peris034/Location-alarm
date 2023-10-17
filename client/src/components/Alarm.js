import React from 'react';
import './Alarm.css'; // Import the CSS file for styles

function Alarm() {
  const handleSetAlarm = () => {
    // Logic for setting the alarm
    alert('Alarm set!');
  };

  return (
    <div className="alarmContainer">
      <h2>Set Alarm</h2>
      <button onClick={handleSetAlarm}>Set Alarm</button>
    </div>
  );
}

export default Alarm;
