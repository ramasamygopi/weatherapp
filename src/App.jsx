import React, { useEffect, useState } from 'react';
import './App.css';
import Cloud from './assets/cloudy.png';
import clear from './assets/sun.png';
import drizzel from './assets/drizzel.png';
import Humidity from './assets/humidity.png';
import rain from './assets/rain.png';
import show from './assets/show.png';
import windimg from './assets/wind.png';
import back from './assets/back.jfif';

const Weatherdetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="" />
      </div>
      <div className="temp">
        {temp}°C
      </div>
      <div className="location">
        {city}
      </div>
      <div className="country">
        {country}
      </div>
      <div className="card">
        <div>
          <span className="lat">Latitude:</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="lo">Longitude:</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={Humidity} alt="" id='humidity' />
          <div className="data">
            <div className="humper">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windimg} alt="" />
          <div className="speed">{wind} km/hr</div>
          <div className="text">Wind speed</div>
        </div>
      </div>
      <div className="copy">
        Designed BY <span>GOPI@WEBDEVELOPER</span>
      </div>
    </>
  );
};

const App = () => {
  let app_id = "69ba854829591275b3a90518616b1b44";
  const [icon, setIcon] = useState(Cloud);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('GB');
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [text, setText] = useState('London');
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const weatherIconMap = {
    "01d": clear,
    "01n": clear,
    "02d": Cloud,
    "02n": Cloud,
    "03d": drizzel,
    "03n": drizzel,
    "04d": drizzel,
    "04n": drizzel,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": show,
    "13n": show,
  };

  const search = async () => {
    setLoading(true);
    setError('');
    setCityNotFound(false);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&APPID=${app_id}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();

      if (data.cod === '404') {
        console.log("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);

      const weatherIconcode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconcode] || clear);
    } catch (error) {
      console.error("An Error occurred:", error.message);
      setError("An error occurred while fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className='container'>
      <div className="input-container">
        <input
          type="text"
          className='cityinput'
          placeholder='Enter the city Name'
          onChange={handleCity}
          value={text}
          onKeyDown={handleKeyDown}
        />
        <div className="search" onClick={search}>
          <i className="bi bi-search"></i>
        </div>
      </div>

      {cityNotFound && <div className="citynot">City Not Found</div>}
      {loading && <div className="loading-msg">Loading...</div>}
      {error && <div className="err-msg">{error}</div>}

      {!cityNotFound && !loading && !error && (
        <Weatherdetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          log={log}
          humidity={humidity}
          wind={wind}
        />
      )}
    </div>
  );
};

export default App;
