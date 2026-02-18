// function WeatherCard({ weather }) {
//     if (!weather) return null;
  
//     const current = weather.list[0];
  
//     return (
//       <div className="weather-container">
//         <h2>{weather.city.name}</h2>
//         <img
//           src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
//           alt={current.weather[0].description}
//         />
//         <p>Temp: {current.main.temp}°C</p>
//         <p>Feels like: {current.main.feels_like}°C</p>
//         <p>Humidity: {current.main.humidity}%</p>
//         <p>Wind: {current.wind.speed} m/s</p>
//         <p>{current.weather[0].description}</p>
//       </div>
//     );
//   }
  
//   export default WeatherCard;
  

function WeatherCard({ weather }) {
  if (!weather) return null;

  const current = weather.list[0];

  return (
    <div className="weather-card">
      <h2>{weather.city.name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
        alt={current.weather[0].description}
      />
      <p>Temp: {Math.round(current.main.temp)}°C</p>
      <p>Feels like: {Math.round(current.main.feels_like)}°C</p>
      <p>Humidity: {current.main.humidity}%</p>
      <p>Wind: {current.wind.speed} m/s</p>
      <p style={{ textTransform: "capitalize" }}>{current.weather[0].description}</p>
    </div>
  );
}

export default WeatherCard;
