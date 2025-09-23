import Activity from '../models/activity.model.js';
import Farmer from '../models/farmer.model.js';

export const logActivityFromVoice = async (req, res) => {
  try {
    const { farmerId } = req.body;
    const audioFile = req.file;

    if (!farmerId || !audioFile) {
      return res.status(400).json({ message: 'Missing farmerId or audio file' });
    }

    // TODO: Add Google Speech-to-Text logic here
    const transcript = "This is a mock transcript from voice input."; // Placeholder

    const newActivity = new Activity({
      farmer: farmerId,
      activity: transcript,
    });

    await newActivity.save();

    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Error logging activity from voice:', error);
    res.status(500).json({ message: 'Server error' });
  }
};