import React, { useState, useEffect } from 'react';
import './LocationInput.css';

function LocationInput() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const [Localarea, setLocalarea] = useState([]);
  const apiKey = 'Your_api_key';

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const key = 'Your_api_key';
          fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`)
            .then(response => response.json())
            .then(data => {
              if (data.results && data.results.length > 0 && data.results[0].address_components) {
                const addressComponents = data.results[0].address_components;
                let city = '';
                let area = '';
                for (const component of addressComponents) {
                  if (component.types.includes('locality')) {
                    city = component.long_name;
                  }
                  if (component.types.includes('administrative_area_level_1')) {
                    area = component.long_name;
                  }
                }
                console.log(city, area);
                setLocalarea(`${city}, ${area}`);
              } else {
                console.error('Error: Invalid data format from geocoding API', data);
              }
            })
            .catch(error => {
              console.error('Error fetching location data:', error);
            });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };


  useEffect(() => {
    fetch('https://ipinfo.io/json?token=Your_token')
      .then(response => response.json())
      .then(data => {
        setUserLocation({
          latitude: parseFloat(data.loc.split(',')[0]),
          longitude: parseFloat(data.loc.split(',')[1])
        });
      })
      .catch(error => console.error('Error fetching location:', error));
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSuggestionClicked(false);
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=${apiKey}`;

    fetch(proxyUrl + apiUrl, {
      cache: "default",
      credentials: "omit",
      headers: {
        Origin: 'http://localhost:3000',
        Accept: "*/*",
        // Origin: window.location.origin,
        "Accept-Language": "en-IN,en-GB;q=0.9,en;q=0.8",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
        "x-requested-with": "XMLHttpRequest",
      },
      method: "GET",
      mode: "cors",
      redirect: "follow",
      referrer: "http://localhost:3000/",
      referrerPolicy: "strict-origin-when-cross-origin"
    })
      .then(response => response.json())
      .then(data => {
        setSuggestions(data.predictions);
      })
      .catch(error => console.error('Error fetching suggestions:', error));
  };

  const handleSetAlarm = () => {
    getUserLocation();
    if (userLocation) {
      if (inputValue.trim() === '') {
        alert('Please enter a location.');
        return;
      }

      const destination = suggestions.find(suggestion => suggestion.description === inputValue);

      if (!destination) {
        alert('Invalid location. Please choose from suggestions.');
        return;
      }

      const destinationCoords = destination.geometry.location;
      const threshold = 100;

      const distance = calculateDistance(userLocation.latitude, userLocation.longitude, destinationCoords.lat, destinationCoords.lng);

      if (distance <= threshold) {
        alert(`You've reached your destination: ${destination.description}`);
        const audio = new Audio('/sounds/Alarm.mp3');
        let playCount = 0;
        const playAudio = () => {
          audio.play();
          audio.onended = () => {
            playCount++;
            if (playCount < 3) {
              playAudio();
            }
          };
        };
        playAudio();
      } else {
        alert(`You're not at your destination yet. Distance: ${distance.toFixed(2)} meters`);
      }
    } else {
      alert('Please allow location access to proceed.');
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.description);
    setSuggestions([]);
    setSuggestionClicked(true);
  };

  return (
    <div className='al'>
      <video src='videos/location.mp4' autoPlay loop muted />
      <div className="locationInputContainer">
        <div className="block">
          <h2>Enter Location</h2>
          <input
            type="text"
            placeholder="Type location here"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="block">
          {suggestions.length > 0 && (
            <ul className="suggestionList">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="block">
          {/* <p>{Localarea}</p> */}
          <button onClick={handleSetAlarm}>Set Alarm</button>
        </div>
      </div>
    </div>
  );
}

export default LocationInput;
