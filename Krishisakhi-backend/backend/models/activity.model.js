// File: backend/models/activity.model.js
import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    activity: {
      type: String,
      required: true,
      trim: true,
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Farmer',
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;