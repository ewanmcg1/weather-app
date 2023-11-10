import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const apiKey = '~';
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('white');

  useEffect(() => {
    // Use useEffect to watch for changes in weatherData
    if (weatherData.weather && weatherData.weather.length > 0) {
      const icon = weatherData.weather[0].icon;
      if (icon.includes('n')) setBackgroundColor('darkslateblue');
      else if (icon.includes('d')) setBackgroundColor('powderblue');
    }
  }, [weatherData]); // Watch for changes in weatherData

  const getWeather = (event) => {
    if (event.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity('');
        })
        .catch((error) => console.error('Error fetching weather data:', error));
    }
  };

  return (
    <div className="container" style={{ backgroundColor }}>
      <input
        className="input"
        placeholder="Enter City..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />

      {typeof weatherData.main === 'undefined' ? (
        <div>
          <p>Welcome to my Weather App! Enter a City to get your weather.</p>
        </div>
      ) : (
        <div className="weather-data">
          <p className="city">{weatherData.name}</p>
          <img className="icon" src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="weather-icon" />
          <p className="temperature">{Math.round(weatherData.main.temp)}°F</p>
          <p className="weather">{weatherData.weather[0].main}</p>
        </div>
      )}

      {weatherData.cod === '404' ? <p>City not found.</p> : <></>}
    </div>
  );
}

export default App;
