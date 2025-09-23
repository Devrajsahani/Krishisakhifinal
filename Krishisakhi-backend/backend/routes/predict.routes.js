import express from "express";
import multer from "multer";
import axios from "axios";

const router = express.Router();
const upload = multer();

const API_URL = "https://api-inference.huggingface.co/models/UtkarshSingh09/plant-disease-model";
const HF_TOKEN = process.env.HF_TOKEN;

router.post("/predict", upload.single("image"), async (req, res) => {
  try {
    console.log("📩 Received request to /api/predict", req.method, req.url);

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    console.log("✅ Image file received, sending to HuggingFace API...");

    const response = await axios.post(
      API_URL,
      req.file.buffer,
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`, // ✅ correct usage
          "Content-Type": "application/octet-stream",
        },
      }
    );

    console.log("✅ Prediction received from HuggingFace");
    res.json(response.data);
  } catch (err) {
    console.error("❌ Prediction error:", err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

export default router;
