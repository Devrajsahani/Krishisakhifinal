// File: backend/routes/farmer.routes.js (Complete Version)

import express from 'express';
import Farmer from '../models/farmer.model.js';
import Activity from '../models/activity.model.js';

const router = express.Router();

// ROUTE: POST /api/profile (Create a new farmer)
router.post('/profile', async (req, res) => {
  try {
    const { name, crop, district, language } = req.body;
    console.log("reciednve dht e data of the body",req.body);
    if (!name || !crop || !district || !language) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newFarmer = new Farmer({ name, crop, district, language });
    const savedFarmer = await newFarmer.save();
    res.status(201).json(savedFarmer);
  } catch (error) {
    console.error('Error creating farmer profile:', error);
    res.status(500).json({ message: 'Server error while creating profile.' });
  }
});

// --- ADD THE NEW ROUTE HERE ---
// ROUTE: GET /api/profile/:farmerId (Fetch a single farmer's data)
router.get('/profile/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;
    const farmer = await Farmer.findById(farmerId);
    
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found.' });
    }
    
    res.status(200).json(farmer);
  } catch (error) {
    console.error('Error fetching farmer profile:', error);
    res.status(500).json({ message: 'Server error while fetching profile.' });
  }
});


// ROUTE: POST /api/activity (Log an activity)
router.post('/activity', async (req, res) => {
  try {
    const { farmerId, activity } = req.body;
    if (!farmerId || !activity) {
      return res.status(400).json({ message: 'Farmer ID and activity are required.' });
    }
    const newActivity = new Activity({ farmerId, activity });
    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    console.error('Error logging activity:', error);
    res.status(500).json({ message: 'Server error while logging activity.' });
  }
});

// ROUTE: GET /api/activities/:farmerId (Fetch activities)
router.get('/activities/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;
    const activities = await Activity.find({ farmerId }).sort({ createdAt: -1 }).limit(10);
    
    if (!activities) {
      return res.status(200).json([]); // Return empty array if no activities
    }
    
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Server error while fetching activities.' });
  }
});

export default router;