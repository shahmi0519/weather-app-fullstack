import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import ErrorMessage from "./components/ErrorMessage";
import { getWeatherByCity, getWeatherByCoords, saveWeatherRequest } from "./services/weatherApi";
import "./styles/app.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Search weather by city
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

      // Save the request in backend DB
      await saveWeatherRequest({
        location: city,
        startDate: new Date(),
        endDate: new Date(),
      });
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Search weather by user's current location
  const searchByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          setLoading(true);
          setError("");
          const data = await getWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
          setWeather(data);
        } catch (err) {
          setWeather(null);
          setError(err.message || "Failed to fetch weather");
        } finally {
          setLoading(false);
        }
      },
      () => setError("Location permission denied. Please enter a city manually.")
    );
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
    </div>
  );
}

export default App;
