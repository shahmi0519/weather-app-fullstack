// function ForecastList({ forecast }) {
//     if (!forecast || forecast.length === 0) return null;
  
//     return (
//       <div className="forecast-container">
//         <h3>5-Day Forecast</h3>
//         <div style={{ display: "flex", overflowX: "auto", gap: "10px", padding: "10px 0" }}>
//           {forecast
//             .filter((_, i) => i % 8 === 0) // roughly every 24h
//             .map((item, i) => {
//               const icon = item.weather?.[0]?.icon;
//               const description = item.weather?.[0]?.description || "No description";
//               const date = item.dt_txt ? item.dt_txt.split(" ")[0] : "Unknown date";
  
//               return (
//                 <div
//                   key={i}
//                   style={{
//                     minWidth: "100px",
//                     padding: "10px",
//                     border: "1px solid #ccc",
//                     borderRadius: "8px",
//                     textAlign: "center",
//                     backgroundColor: "#fff",
//                     boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//                   }}
//                 >
//                   <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{date}</p>
//                   <img
//                     src={
//                       icon
//                         ? `https://openweathermap.org/img/wn/${icon}@2x.png`
//                         : "https://via.placeholder.com/60?text=No+Icon"
//                     }
//                     alt={description}
//                     style={{ width: "60px", height: "60px" }}
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "https://via.placeholder.com/60?text=No+Icon";
//                     }}
//                   />
//                   <p style={{ margin: "5px 0" }}>{Math.round(item.main.temp)}°C</p>
//                   <p style={{ fontSize: "12px", textTransform: "capitalize" }}>{description}</p>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     );
//   }
  
//   export default ForecastList;
  

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
