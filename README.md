# Full-Stack Weather App

**Author:** Abdul Jabbar Ahamed Shahmi  
**Role:** AI & Machine Learning Engineer Intern  
**Project:** Weather App – Full Stack Technical Assessment  

---

## Project Overview

This project is a full-stack weather application built to retrieve and display real-time weather data for user-specified locations. It meets both frontend and backend assessment requirements for a technical internship.

The app allows users to:

- Enter a location (ZIP code, GPS coordinates, city, or landmark) and view the current weather.
- See a 5-day weather forecast.
- Retrieve weather for the current user location.
- Handle errors gracefully when a location is invalid or API fails.
- Perform CRUD operations on weather data stored in the backend database.
- Export stored weather data to JSON, CSV, XML, Markdown, or PDF formats.

---

## Features

### Frontend

- Built with **React**.
- Components:
  - `SearchBar.jsx` – User input for location.
  - `WeatherCard.jsx` – Displays current weather.
  - `ForecastList.jsx` – Displays 5-day forecast.
  - `ErrorMessage.jsx` – Handles errors and displays messages.
- Services:
  - `weatherApi.js` – Handles API requests to fetch weather data.
- Styles:
  - `app.css` – Responsive design for desktop and mobile.
- Supports responsive design for multiple devices (desktop, tablet, mobile).

### Backend

- Built with **Node.js** and **Express.js**.
- Controllers:
  - `weather.controller.js` – Handles API logic and database interactions.
- Models:
  - `WeatherRequest.js` – Weather data schema.
- Routes:
  - `weather.routes.js` – RESTful endpoints for CRUD operations.
- Services:
  - `weather.service.js` – Business logic for weather data handling.
- Utilities:
  - `export.utils.js` – Exports database data to JSON, CSV, XML, Markdown, or PDF.

---

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd weather-app-fullstack
```

2. Install backend dependencies:

```bash
cd ../backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

---

## Running the App

### Backend

```bash
cd backend
npx nodemon src/app.js
```

The backend server runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173`.

---

## API Endpoints

- `POST /weather` – Add a new weather request to the database.
- `GET /weather` – Get stored weather requests.
- `GET /weather/:id` – Get a single weather record.
- `PUT /weather/:id` – Update a weather record.
- `DELETE /weather/:id` – Delete a weather record.
- `GET /weather/export?format=json|csv|xml|markdown|pdf` – Export stored weather data.
- `GET /weather/live?city=cityName` – Get live weather for a city.
- `GET /weather/live/coords?lat=xx&lon=yy` – Get live weather for coordinates.
- `GET /weather/maps/:id` – Get Google Maps link for a stored weather location.
- `GET /weather/youtube/:id` – Get related YouTube videos for a location.

---

## Error Handling

- If the location is invalid, the app displays an error message using `ErrorMessage.jsx`.
- API failures are handled gracefully with user-friendly messages.

---

## Notes

- Real-time weather data is retrieved via external APIs.
- The frontend is fully responsive and functional across different screen sizes.
- Backend ensures CRUD functionality, API integration, and data persistence.
- Data can be exported in multiple formats for reporting or analysis.
