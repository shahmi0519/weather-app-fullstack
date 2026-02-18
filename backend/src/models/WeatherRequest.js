const mongoose = require("mongoose");

const WeatherRequestSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true
    },
    latitude: Number,
    longitude: Number,
    startDate: Date,
    endDate: Date,
    weatherData: Array
  },
  { timestamps: true }
);

module.exports = mongoose.model("WeatherRequest", WeatherRequestSchema);
