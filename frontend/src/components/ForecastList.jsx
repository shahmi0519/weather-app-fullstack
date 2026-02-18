function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="forecast-list">
      <h3>5-Day Forecast</h3>
      <div className="forecast-cards">
        {forecast
          .filter((_, i) => i % 8 === 0) // roughly every 24h
          .map((item, i) => {
            const icon = item.weather?.[0]?.icon;
            const description = item.weather?.[0]?.description || "No description";
            const date = item.dt_txt ? item.dt_txt.split(" ")[0] : "Unknown date";

            return (
              <div key={i} className="forecast-card">
                <p className="forecast-date">{date}</p>
                <img
                  src={icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : "https://via.placeholder.com/60?text=No+Icon"}
                  alt={description}
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/60?text=No+Icon"; }}
                />
                <p className="forecast-temp">{Math.round(item.main.temp)}°C</p>
                <p className="forecast-desc">{description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ForecastList;
