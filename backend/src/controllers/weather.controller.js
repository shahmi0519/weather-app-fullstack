const WeatherRequest = require("../models/WeatherRequest");
const { getWeatherByCity } = require("../services/weather.service");
const { convertToCSV } = require("../utils/export.utils");
const js2xmlparser = require("js2xmlparser");
const PDFDocument = require("pdfkit");
const axios = require("axios");

// CREATE
const createWeather = async (req, res) => {
  try {
    const { location, startDate, endDate } = req.body;
    if (!location || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ error: "Invalid date range" });
    }

    const weatherApiData = await getWeatherByCity(location);

    const record = await WeatherRequest.create({
      location,
      latitude: weatherApiData.city.coord.lat,
      longitude: weatherApiData.city.coord.lon,
      startDate,
      endDate,
      weatherData: weatherApiData.list
    });

    res.status(201).json(record);
  } catch (error) {
    console.error("ERROR DETAILS:", error.response?.data || error.message);
    res.status(500).json({
      error: "Weather API failed",
      details: error.response?.data || error.message
    });
  }
};

// READ
const getAllWeather = async (req, res) => {
  try {
    const records = await WeatherRequest.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

const getWeatherById = async (req, res) => {
  try {
    const record = await WeatherRequest.findById(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found" });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Invalid ID format" });
  }
};

const getLiveWeather = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const weatherData = await getWeatherByCity(city);
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
};

const getLiveWeatherByCoords = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: "Coordinates required" });
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;
    const response = await axios.get(url);

    res.status(200).json(response.data);
  } catch {
    res.status(500).json({ error: "Failed to fetch weather by location" });
  }
};

const getLiveWeatherByCity = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;
    const response = await axios.get(url);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("LIVE CITY ERROR:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to fetch live weather by city",
      details: error.response?.data || error.message
    });
  }
};



// UPDATE
const updateWeather = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, startDate, endDate } = req.body;

    const record = await WeatherRequest.findById(id);
    if (!record) return res.status(404).json({ error: "Record not found" });

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ error: "Invalid date range" });
    }

    if (location) {
      const weatherApiData = await getWeatherByCity(location);
      record.weatherData = weatherApiData.list;
      record.latitude = weatherApiData.city.coord.lat;
      record.longitude = weatherApiData.city.coord.lon;
      record.location = location;
    }
    if (startDate) record.startDate = startDate;
    if (endDate) record.endDate = endDate;

    await record.save();
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: "Failed to update record" });
  }
};

// DELETE
const deleteWeather = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await WeatherRequest.findByIdAndDelete(id);
    if (!record) return res.status(404).json({ error: "Record not found" });
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete record" });
  }
};

// EXPORT - unified
const exportData = async (req, res) => {
  try {
    const { format } = req.query; // ?format=json|csv|xml|markdown|pdf
    const records = await WeatherRequest.find();

    switch (format) {
      case "json":
        res.header("Content-Type", "application/json");
        res.attachment("weather_records.json");
        return res.send(JSON.stringify(records, null, 2));
      case "csv":
        res.header("Content-Type", "text/csv");
        res.attachment("weather_records.csv");
        return res.send(convertToCSV(records));
      case "xml":
        res.header("Content-Type", "application/xml");
        res.attachment("weather_records.xml");
        return res.send(js2xmlparser.parse("weatherRecords", { record: records }));
      case "markdown":
        let markdown = "# Weather Records\n\n";
        records.forEach(r => {
          markdown += `## ${r.location}\n`;
          markdown += `**Date Range:** ${r.startDate.toDateString()} - ${r.endDate.toDateString()}\n\n`;
          markdown += `**Coordinates:** ${r.latitude}, ${r.longitude}\n\n`;
          markdown += `**Weather Data Sample:**\n`;
          r.weatherData.slice(0, 3).forEach(item => {
            markdown += `- ${item.dt_txt}: ${item.main.temp}°C, ${item.weather[0].description}\n`;
          });
          markdown += "\n";
        });
        res.header("Content-Type", "text/markdown");
        res.attachment("weather_records.md");
        return res.send(markdown);
      case "pdf":
        const doc = new PDFDocument();
        res.header("Content-Type", "application/pdf");
        res.attachment("weather_records.pdf");
        doc.pipe(res);
        records.forEach(r => {
          doc.text(`Location: ${r.location}`);
          doc.text(`Date Range: ${r.startDate.toDateString()} - ${r.endDate.toDateString()}`);
          doc.text(`Coordinates: ${r.latitude}, ${r.longitude}`);
          doc.text("Sample Weather Data:");
          r.weatherData.slice(0, 3).forEach(item => {
            doc.text(`- ${item.dt_txt}: ${item.main.temp}°C, ${item.weather[0].description}`);
          });
          doc.moveDown();
        });
        doc.end();
        break;
      default:
        res.status(400).json({ error: "Unsupported format" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to export data" });
  }
};

// MAP
const getMap = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await WeatherRequest.findById(id);
    if (!record) return res.status(404).json({ error: "Record not found" });

    const mapUrl = `https://www.google.com/maps?q=${record.latitude},${record.longitude}`;
    res.status(200).json({ mapUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to get map" });
  }
};

// YOUTUBE VIDEOS
const getYouTubeVideos = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await WeatherRequest.findById(id);
    if (!record) return res.status(404).json({ error: "Record not found" });

    const query = encodeURIComponent(record.location + " travel");
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=5&key=${process.env.YOUTUBE_API_KEY}`;

    const response = await axios.get(url);
    const videos = response.data.items.map(item => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));

    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch YouTube videos" });
  }
};

module.exports = {
  createWeather,
  getAllWeather,
  getWeatherById,
  updateWeather,
  deleteWeather,
  exportData,
  getMap,
  getYouTubeVideos,
  getLiveWeather,
  getLiveWeatherByCoords,
  getLiveWeatherByCity
};
