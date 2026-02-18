require("dotenv").config();
console.log("API KEY:", process.env.OPENWEATHER_API_KEY);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const weatherRoutes = require("./routes/weather.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/weather", weatherRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});