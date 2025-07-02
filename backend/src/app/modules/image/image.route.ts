import express from "express";
import multer from 'multer';

import { imageControllers } from "./image.controller";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); 
    } else {
      cb(new Error('Only image files are allowed!')); 
    }
  },
});

router.post('/upload',upload.array('propertyImage', 5), imageControllers.uploadImageToDB);

export const imageRoutes = router;