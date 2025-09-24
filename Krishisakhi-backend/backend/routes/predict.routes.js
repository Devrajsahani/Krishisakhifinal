import express from 'express';
import axios from 'axios';
import multer from 'multer';
import FormData from 'form-data'; // 1. Import the new library

const router = express.Router();

// --- Configuration ---
const AI_SERVER_URL = process.env.AI_SERVER_URL;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Function to call the FastAPI server ---
const callFastAPIServer = async (imageBuffer, originalFilename) => {
    if (!AI_SERVER_URL) {
        throw new Error("AI Server URL is not configured in .env");
    }
    
    // 2. Create a new form data object
    const form = new FormData();
    // 3. Append the image buffer. The field name MUST be "file" to match the Python code.
    form.append('file', imageBuffer, { filename: originalFilename });

    try {
        console.log(`Forwarding image to FastAPI server at ${AI_SERVER_URL}`);
        const response = await axios.post(
            AI_SERVER_URL,
            form,
            {
                headers: {
                    ...form.getHeaders(), // 4. Let the library set the correct headers
                },
                timeout: 30000, // 30 seconds
            }
        );
        return response.data;
    } catch (error) {
        console.error('❌ Error calling FastAPI server:', error.response?.data || error.message);
        throw new Error('Failed to get a prediction from the AI model.');
    }
};

// --- The Prediction Route ---
router.post('/predict', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required.' });
        }

        const imageBuffer = req.file.buffer;
        const originalFilename = req.file.originalname;

        const prediction = await callFastAPIServer(imageBuffer, originalFilename);

        res.status(200).json({ success: true, prediction });

    } catch (error) {
        console.error("❌ Prediction route error:", error.message);
        res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    }
});

export default router;