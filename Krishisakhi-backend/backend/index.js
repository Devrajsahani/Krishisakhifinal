import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import farmerRoutes from './routes/farmer.routes.js';
import predictRoutes from "./routes/predict.routes.js";
import weatherRoutes from "./routes/weather.routes.js";
import marketRoutes from "./routes/market.routes.js";

const startServer = async () => {
  try {
    // 1. First, connect to the database and wait for it to finish.
    await connectDB();

    // 2. Only after, create and configure the app.
    const app = express();
    const PORT = process.env.PORT || 5000;

    // A robust CORS configuration is essential for connecting frontend and backend.
    const corsOptions = {
      // Use an environment variable for the frontend URL, with a sensible default for local development.
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    };

    // Use CORS for all other requests
    app.use(cors(corsOptions));

    app.use(express.json());
    app.use('/api', farmerRoutes);
    app.use('/api', predictRoutes);
    app.use('/api', weatherRoutes);
    app.use('/api', marketRoutes);

    app.get('/', (req, res) => {
      res.json({ message: 'Welcome to Krishi Sakhi Backend API!' });
    });

    // 3. And only then, start listening for requests.
    app.listen(PORT, () => {
      console.log(`✅ Server is now running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Run the function that starts everything
startServer();