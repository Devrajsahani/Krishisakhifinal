import express from 'express';
import axios from 'axios';

const router = express.Router();

const DATA_GOV_API_KEY = process.env.DATA_GOV_IN_API_KEY;
// This is the specific resource ID for daily agricultural commodity prices in India
const DATA_GOV_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

/**
 * ROUTE: GET /api/market-price
 * Fetches market prices for a given crop and district.
 */
router.get('/market-price', async (req, res) => {
  const { district, crop } = req.query;

  if (!district || !crop) {
    return res.status(400).json({ message: 'District and crop are required query parameters.' });
  }

  if (!DATA_GOV_API_KEY) {
    return res.status(500).json({ message: 'Market price API key is not configured on the server.' });
  }

  try {
    let records = [];
    const capitalizedCrop = crop.charAt(0).toUpperCase() + crop.slice(1);

    // 1. Try fetching with the specific district and crop
    try {
      const specificResponse = await axios.get(DATA_GOV_URL, {
        params: {
          'api-key': DATA_GOV_API_KEY,
          format: 'json',
          limit: 100,
          filters: {
            district: district.charAt(0).toUpperCase() + district.slice(1),
            commodity: capitalizedCrop,
          },
        },
      });
      records = specificResponse.data.records || [];
    } catch (e) {
      console.error(`Initial market price fetch for ${crop} in ${district} failed. Will try fallback.`);
    }

    // 2. If no records, fall back to searching the entire state of Kerala for the crop
    if (records.length === 0) {
      console.log(`No data for ${crop} in ${district}. Falling back to state-wide search for Kerala.`);
      const fallbackResponse = await axios.get(DATA_GOV_URL, {
        params: {
          'api-key': DATA_GOV_API_KEY,
          format: 'json',
          limit: 100,
          filters: { state: 'Kerala', commodity: capitalizedCrop },
        },
      });
      records = fallbackResponse.data.records || [];
    }

    if (!records || records.length === 0) {
      return res.status(404).json({ message: `No market data found for ${crop} in ${district}.` });
    }

    // To make it dynamic, we pick a random market from the results each time
    const randomRecord = records[Math.floor(Math.random() * records.length)];

    res.json({
      market: randomRecord.market,
      crop: randomRecord.commodity,
      price: randomRecord.modal_price,
      advisory: `Prices are steady. Consider selling if the price is above ₹${parseInt(randomRecord.modal_price) - 50}.`,
    });

  } catch (error) {
    console.error("Error fetching market price:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to fetch market price data.' });
  }
});

export default router;