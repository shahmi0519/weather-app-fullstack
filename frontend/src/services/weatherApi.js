const BASE_URL = "http://localhost:5000/api/weather";

/**
 * Get live weather by city via backend
 */
export const getWeatherByCity = async (city) => {
  const res = await fetch(`${BASE_URL}/live?city=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error("City not found");
  return res.json();
};

/**
 * Get live weather by coordinates via backend
 */
export const getWeatherByCoords = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL}/live/coords?lat=${lat}&lon=${lon}`
  );
  if (!res.ok) throw new Error("Failed to fetch location weather");
  return res.json();
};

/**
 * Save weather request to backend
 */
export const saveWeatherRequest = async (payload) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to save weather request");
  return res.json();
};
