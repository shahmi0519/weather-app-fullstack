import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Get forecast weather by city
export const getWeatherByCity = async (city) => {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
};

// Save weather request to backend DB
export const saveWeatherRequest = async (payload) => {
  const res = await fetch("http://localhost:5000/api/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to save weather request");
  }

  return res.json();
};
