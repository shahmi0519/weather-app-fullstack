// import { useState } from "react";
// import SearchBar from "./components/SearchBar";
// import WeatherCard from "./components/WeatherCard";
// import ForecastList from "./components/ForecastList";
// import ErrorMessage from "./components/ErrorMessage";
// import { getWeatherByCity, getWeatherByCoords, saveWeatherRequest } from "./services/weatherApi";
// import "./styles/app.css";

// function App() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Search weather by city
//   const searchByCity = async () => {
//     if (!city.trim()) {
//       setError("Please enter a city");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       const data = await getWeatherByCity(city);
//       setWeather(data);

//       // Save the request in backend DB
//       await saveWeatherRequest({
//         location: city,
//         startDate: new Date(),
//         endDate: new Date(),
//       });
//     } catch (err) {
//       setWeather(null);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Search weather by user's current location
//   const searchByLocation = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         try {
//           setLoading(true);
//           setError("");
//           const data = await getWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
//           setWeather(data);
//         } catch (err) {
//           setWeather(null);
//           setError(err.message || "Failed to fetch weather");
//         } finally {
//           setLoading(false);
//         }
//       },
//       () => setError("Location permission denied. Please enter a city manually.")
//     );
//   };

//   return (
//     <div className="app">
//       <h1>Weather App</h1>

//       <SearchBar
//         city={city}
//         setCity={setCity}
//         onSearch={searchByCity}
//         onLocation={searchByLocation}
//       />

//       {loading && <p style={{ fontWeight: "bold" }}>Loading...</p>}

//       <ErrorMessage message={error} />

//       {weather && (
//         <>
//           <WeatherCard weather={weather} />
//           <ForecastList forecast={weather.list} />
//         </>
//       )}
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import ErrorMessage from "./components/ErrorMessage";
import {
  getWeatherByCity,
  getWeatherByCoords,
  saveWeatherRequest
} from "./services/weatherApi";

const BASE_URL = "http://localhost:5000/api/weather";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [savedData, setSavedData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all saved weather on load
  useEffect(() => {
    fetchSavedData();
  }, []);

  const fetchSavedData = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setSavedData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const searchByCity = async () => {
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const data = await getWeatherByCity(city);
      setWeather(data);

      // Save to backend
      await saveWeatherRequest({
        location: city,
        startDate: new Date(),
        endDate: new Date()
      });

      fetchSavedData(); // refresh saved data
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          setLoading(true);
          setError("");
          const data = await getWeatherByCoords(
            pos.coords.latitude,
            pos.coords.longitude
          );
          setWeather(data);
        } catch (err) {
          setWeather(null);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => setError("Location permission denied")
    );
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      fetchSavedData();
    } catch (err) {
      console.error(err);
    }
  };

  // UPDATE (simplified: update endDate to today)
  const handleUpdate = async (id) => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endDate: new Date() })
      });
      fetchSavedData();
    } catch (err) {
      console.error(err);
    }
  };

  // EXPORT (JSON example)
  const handleExport = async (format = "json") => {
    try {
      const res = await fetch(`${BASE_URL}/export?format=${format}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `weather_records.${format}`;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>

      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={searchByCity}
        onLocation={searchByLocation}
      />

      {loading && <p style={{ fontWeight: "bold" }}>Loading...</p>}
      <ErrorMessage message={error} />

      {weather && (
        <>
          <WeatherCard weather={weather} />
          <ForecastList forecast={weather.list} />
        </>
      )}

      <h3>Saved Weather Requests</h3>
      <button onClick={() => handleExport("json")}>Export JSON</button>
      <button onClick={() => handleExport("csv")}>Export CSV</button>
      <button onClick={() => handleExport("pdf")}>Export PDF</button>

      {savedData.map((entry) => (
        <div
          key={entry._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            borderRadius: "8px"
          }}
        >
          <p><strong>{entry.location}</strong></p>
          <p>
            {new Date(entry.startDate).toLocaleDateString()} -{" "}
            {new Date(entry.endDate).toLocaleDateString()}
          </p>
          <p>Lat: {entry.latitude}, Lon: {entry.longitude}</p>
          <button onClick={() => handleUpdate(entry._id)}>Update</button>
          <button onClick={() => handleDelete(entry._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
