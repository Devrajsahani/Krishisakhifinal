import { Router } from 'express';
import multer from 'multer';
import { logActivityFromVoice } from '../controllers/activity.controller.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/log-voice', upload.single('audio'), logActivityFromVoice);

export default router;