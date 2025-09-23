import mongoose from 'mongoose';

// This is the Blueprint (Schema)
const farmerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends of a string
    },
    crop: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      // Not required for MVP, but good to have
    },
    phoneNumber: {
      type: String,
      // Not required for MVP, but good to have
    },
  },
  {
    // This option automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

// This is the Tool to interact with the database, based on the blueprint
const Farmer = mongoose.model('Farmer', farmerSchema);

export default Farmer;
