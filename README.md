# Weather App - Full-Stack Assessment

## Project Overview

This is a Full-Stack Weather App built for the AI Engineer Intern Technical Assessment. The app allows users to input a location (Zip Code, GPS Coordinates, Landmarks, Town, City) to retrieve the current weather, a 5-day forecast, and additional weather details. Users can also view weather for their current location. The app includes CRUD functionality, data persistence, and data export options.

---

## Features

* Current weather for any location
* 5-day weather forecast
* Location input validation and error handling
* Store weather requests in a database (CRUD operations)
* Export weather data in JSON, CSV, or PDF
* Integration with external APIs (OpenWeatherMap, Google Maps, YouTube)

---

## Technology Stack

**Frontend:** HTML, CSS, JavaScript

**Backend:** Node.js, Express.js

**Database:** MongoDB (NoSQL) or PostgreSQL/MySQL (SQL)

**APIs:** OpenWeatherMap API, Google Maps API, YouTube API (optional)

---

## Folder Structure

```
weather-app-fullstack/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── assets/        # icons/images
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── weather.js
│   ├── controllers/
│   │   └── weatherController.js
│   ├── models/
│   │   └── Weather.js
│   └── config/
│       └── db.js
│
├── README.md
├── .gitignore
├── package.json
└── requirements.txt
```

---

## Setup Instructions

### Frontend

Open the `frontend/index.html` file in your browser or use a live server extension.

### Backend (Node.js Example)

```bash
# Clone repository
git clone https://github.com/yourusername/weather-app-fullstack.git
cd weather-app-fullstack/backend

# Install dependencies
npm install

# Start backend server
node server.js
```

### Environment Variables

Create a `.env` file in `backend/config/` for API keys:

```
OPENWEATHER_API_KEY=your_openweathermap_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

---

## Usage

1. Open the frontend and enter a location.
2. View current weather and 5-day forecast.
3. Save requests to the database.
4. Read, update, or delete previous entries.
5. Export data in JSON, CSV, or PDF formats.

---

## APIs Used

* OpenWeatherMap API: Real-time weather and forecast data
* Google Maps API: Location validation and maps
* YouTube API: Optional videos related to the location

---

## Demo Video

Link to demo video showcasing features and code: [Demo Video](https://drive.google.com/your-demo-link)

---

## Author

**Abdul Jabbar Ahamed Shahmi**

* AI & Machine Learning Engineer Intern
* Product Manager Accelerator (LinkedIn: [https://www.linkedin.com/company/product-manager-accelerator/](https://www.linkedin.com/company/product-manager-accelerator/))

---

## License

This project is submitted for the AI Engineer Intern Technical Assessment and is intended for evaluation purposes.
