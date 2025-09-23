// File: frontend/src/services/api.ts

import axios from 'axios';
 
// Use environment variables for the API base URL.
// This makes it easy to switch between development and production.
// In a standard React app (created with Create React App), variables must start with REACT_APP_.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Create a configured instance of axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Interfaces (Data Blueprints) ---
// This defines what the Farmer Profile data looks like
export interface FarmerProfile {
  _id: string;
  name: string;
  crop: string;
  district: string;
  language: string;
}

export interface Activity {
  _id: string;
  farmerId: string;
  activity: string;
  createdAt: string;
}

export interface WeatherInfo {
  temperature: string;
  humidity: number;
  rainChance: string;
  advisory: string;
}

export interface MarketPriceInfo {
  market: string;
  crop: string;
  price: string;
  advisory: string;
}

type CreateFarmerInput = Omit<FarmerProfile, '_id'>;
type LogActivityInput = Omit<Activity, '_id' | 'createdAt'>;

// --- API Service ---
// An object that holds all our API functions
export const apiService = {
  /**
   * Creates a new farmer profile on the server.
   * @param data The farmer's data (name and crop).
   * @returns The newly created farmer profile from the server.
   */
  createFarmerProfile: async (data: CreateFarmerInput): Promise<FarmerProfile> => {
    try {
      // Make the POST request to the /profile endpoint
      const response = await apiClient.post('/profile', data);
      return response.data;
    } catch (error) {
      console.error('Error creating farmer profile:', error);
      // Re-throw the error so the component can handle it
      throw error;
    }
  },

  /**
   * Fetches a farmer's profile from the server using their ID.
   * @param farmerId The ID of the farmer to fetch.
   * @returns The farmer's profile data.
   */
  getFarmerProfile: async (farmerId: string): Promise<FarmerProfile> => {
    try {
      const response = await apiClient.get(`/profile/${farmerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching farmer profile for ID ${farmerId}:`, error);
      throw error;
    }
  },

  /**
   * Fetches all activities for a given farmer.
   * @param farmerId The ID of the farmer.
   * @returns An array of the farmer's activities.
   */
  getFarmerActivities: async (farmerId: string): Promise<Activity[]> => {
    try {
      // NOTE: Your backend needs a '/activities/:farmerId' route for this to work.
      const response = await apiClient.get(`/activities/${farmerId}`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(`Error fetching activities for farmer ID ${farmerId}:`, error);
      throw error;
    }
  },

  /**
   * Logs a new activity for a farmer.
   * @param data The activity data, including farmerId and the activity description.
   * @returns The newly created activity object.
   */
  logActivity: async (data: LogActivityInput): Promise<Activity> => {
    try {
      const response = await apiClient.post('/activity', data);
      return response.data;
    } catch (error) {
      console.error('Error logging activity:', error);
      throw error;
    }
  },

  /**
   * Sends an image to the backend for disease diagnosis.
   * @param formData The FormData object containing the image file.
   * @returns The diagnosis result from the server.
   */
  diagnose: async (formData: FormData): Promise<any> => {
    try {
      // When sending FormData, axios automatically sets the correct 'multipart/form-data'
      // header. We must override the default 'application/json' for this call.
      const response = await apiClient.post('/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error diagnosing image:', error);
      throw error;
    }
  },

  /**
   * Fetches weather data and an AI advisory for a specific district.
   * @param district The name of the district.
   * @returns The weather information.
   */
  getWeather: async (district: string): Promise<WeatherInfo> => {
    try {
      const response = await apiClient.get(`/weather/${district}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching weather for ${district}:`, error);
      throw error;
    }
  },

  /**
   * Fetches market price for a given crop and district.
   * @param district The farmer's district.
   * @param crop The farmer's primary crop.
   * @returns The market price information.
   */
  getMarketPrice: async (district: string, crop: string): Promise<MarketPriceInfo> => {
    try {
      const response = await apiClient.get('/market-price', { params: { district, crop } });
      return response.data;
    } catch (error) {
      console.error(`Error fetching market price for ${crop} in ${district}:`, error);
      throw error;
    }
  },
};