import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Start from "./components/Start";
import Location from "./components/Location";

function App() {
  const [zipcode, setZipcode] = useState("");
  const [weather, setWeather] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Start
              zipcode={zipcode}
              setZipcode={setZipcode}
              weather={weather}
              setWeather={setWeather}
              location={location}
              setLocation={setLocation}
              error={error}
              setError={setError}
            />
          }
        />
        <Route
          path={`/location/${zipcode}`}
          element={
            <Location
              weather={weather}
              location={location}
              setLocation={setLocation}
              setWeather={setWeather}
              setZipcode={setZipcode}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
