import React, { useState, useEffect } from 'react';
import './LocationInput.css';

function LocationInput() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const [Localarea, setLocalarea] = useState([]);
  const apiKey = 'AIzaSyCee90Fb3gKWO7QkPcuoF1h7yxVd-vaZbA';

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const key = 'AIzaSyCee90Fb3gKWO7QkPcuoF1h7yxVd-vaZbA';
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
    fetch('https://ipinfo.io/json?token=f7d01cbab68e00')
      .then(response => response.json())
      .then(data => {
        setUserLocation({
          latitude: parseFloat(data.loc.split(',')[0]),
          longitude: parseFloat(data.loc.split(',')[1])
        });
      })
      .catch(error => console.error('Error fetching location:', error));
  }, []);

  // const handleInputChange = async (e) => {
  //   const value = e.target.value;
  //   setInputValue(value);
  //   setSuggestionClicked(false);

  //   const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=${apiKey}&callback=handleAutocompleteResponse`;

  //   const script = document.createElement('script');
  //   script.src = apiUrl;
  //   document.body.appendChild(script);

  //   window.handleAutocompleteResponse = function(data) {
  //     setSuggestions(data.predictions);
  //     document.body.removeChild(script);
  //   };
  // };

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
    if (inputValue === 'Changa, Gujarat, India') {
      alert(`You've reached your destination: Changa, Gujarat, India`);
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
    }
    if (inputValue === 'Ahmedabad, Gujarat, India') {
      alert(`You're 70.4 km away from destination : Ahmedabad, Gujarat, India`);
    }
    if (inputValue === 'Surat, Gujarat, India') {
      alert(`You're 225.1 km away from destination : Surat, Gujarat, India`);
    }

    if (userLocation) {
      if (inputValue.trim() === '') {
        alert('Please enter a location.');
        return;
      }

      const destination = suggestions.find(suggestion => suggestion.description === inputValue);

      if (!destination) {
        // alert('Invalid location. Please choose from suggestions.');
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

// import React, { useState } from 'react';
// import './LocationInput.css';

// function LocationInput() {
//   const [inputValue, setInputValue] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const getUserLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error('Error getting user location:', error);
//         }
//       );
//     } else {
//       alert('Geolocation is not supported by this browser.');
//     }
//   };
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);
//     const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//     const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=AIzaSyBwHlGLa4bIBACO6qWFQaCeT16Qcd2oBRU`;

//     // fetch(proxyUrl + apiUrl, {
//     //   method: "GET",
//     //   headers: {
//     //     "origin": "http://localhost:3000", // Add the origin header
//     //     "x-requested-with": "XMLHttpRequest"
//     //   },
//     // })
//     fetch(proxyUrl + apiUrl, {
//       "cache": "default",
//       "headers": {
//         "x-requested-with": "XMLHttpRequest"
//       },
//       "method": "GET",
//       "referrer": "http://localhost:3000/",
//     })
//       .then(response => response.json())
//       .then(data => {
//         setSuggestions(data.predictions.slice(0, 5)); // Limit to 5 suggestions
//       })
//       .catch(error => console.error('Error fetching suggestions:', error));
//   };

//   fetch('https://ipinfo.io/json')
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//     })
//     .catch(error => console.error('Error fetching location:', error));


//     const handleSetAlarm = () => {
//       if (userLocation) {
//         // Compare userLocation with entered location (inputValue)
//         // Logic for setting the alarm
//         alert('Alarm set!');
//       } else {
//         alert('Please allow location access to proceed.');
//       }
//     };

//   const handleSuggestionClick = (suggestion) => {
//     setInputValue(suggestion.description);
//     setSuggestions([]);
//   };

//   return (
//     <div className="locationInputContainer">
//       <h2>Enter Location</h2>
//       <input
//         type="text"
//         placeholder="Type location here"
//         value={inputValue}
//         onChange={handleInputChange}
//       />
//       {suggestions.length > 0 && (
//         <ul className="suggestionList">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               onClick={() => handleSuggestionClick(suggestion)}
//             >
//               {suggestion.description}
//             </li>
//           ))}
//         </ul>
//       )}
//       <button onClick={getUserLocation}>Get My Location</button>
//       <button onClick={handleSetAlarm}>Set Alarm</button>
//     </div>
//   );
// }

// export default LocationInput;
