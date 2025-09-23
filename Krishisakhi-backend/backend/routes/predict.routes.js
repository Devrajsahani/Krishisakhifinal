import express from 'express';
import axios from 'axios';
const router = express.Router();

// --- 💡 1. Set the URL for your Local AI Server ---
// For best practice, move this to your .env file
const LOCAL_AI_SERVER_URL = process.env.AI_SERVER_URL || 'http://10.1.185.89:8000/predict';

// --- 💡 2. Renamed the function for clarity ---
const callLocalAIServer = async (imageDataBuffer) => {
    try {
        console.log(`Forwarding request to local AI server: ${LOCAL_AI_SERVER_URL}`);
        const response = await axios.post(
            LOCAL_AI_SERVER_URL,
            imageDataBuffer, // Send the raw image data
            {
                headers: {
                    // This header is still needed to tell the AI server it's receiving raw binary data
                    "Content-Type": "application/octet-stream",
                },
                timeout: 30000, // 30 seconds
            }
            // 💡 3. Authorization header is removed as it's not needed for your local server
        );
        return response.data;
    } catch (error) {
        console.error('❌ Error calling local AI server:', error.message);
        throw new Error('Failed to get a prediction from the local AI model.');
    }
};

router.post('/predict', async (req, res) => {
    try {
        const { imageUrl } = req.body;
        if (!imageUrl) {
            return res.status(400).json({ message: 'Image URL is required.' });
        }

        // --- Download the image from the provided URL (This part remains the same) ---
        const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer'
        });
        const imageBuffer = Buffer.from(imageResponse.data);

        // --- 💡 4. Call the updated function ---
        const prediction = await callLocalAIServer(imageBuffer);
        
        res.status(200).json({ success: true, prediction });

    } catch (error) {
        console.error("❌ Prediction route error:", error.message);
        if (error.isAxiosError) {
            return res.status(400).json({ success: false, message: 'Failed to download image from the provided URL.'});
        }
        res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    }
});

export default router;