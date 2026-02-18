const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/weather.controller");


router.get("/live/city", getLiveWeatherByCity);
router.get("/live", getLiveWeather);
router.get("/live/coords", getLiveWeatherByCoords);
router.get("/export", exportData);
router.get("/maps/:id", getMap);
router.get("/youtube/:id", getYouTubeVideos);

router.post("/", createWeather);
router.get("/", getAllWeather);
router.get("/:id", getWeatherById);
router.put("/:id", updateWeather);
router.delete("/:id", deleteWeather);


module.exports = router;
