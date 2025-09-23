// File: backend/routes/weather.routes.js

import express from 'express';
import axios from 'axios';

const router = express.Router();

// ROUTE: GET /api/weather/:district
router.get('/weather/:district', async (req, res) => {
  try {
    const { district } = req.params;

    if (!district) {
      return res.status(400).json({ message: 'District is required.' });
    }

    // Use your OpenWeather API key from .env, with a working fallback.
    const apiKey = process.env.OPENWEATHER_API_KEY || "44a0d37ab3e63bcd9b59a52f708f4222";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${district}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);

    // Extract relevant details
    const data = response.data;
    // Note: The frontend expects a different structure. Let's adapt to what DashboardPage.tsx needs.
    const weatherInfo = {
      temperature: data.main.temp.toFixed(0),
      humidity: data.main.humidity,
      // OpenWeather `pop` is probability of precipitation, from 0 to 1.
      rainChance: (data.pop || 0) * 100, 
      advisory: `Current weather in ${data.name} is ${data.weather[0].description}. Plan accordingly.`,
    };

    res.status(200).json(weatherInfo);
  } catch (error) {
    console.error('Error fetching weather:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Error fetching weather data.';
    res.status(status).json({ message: `Weather service error: ${message}` });
  }
});

export default router;
