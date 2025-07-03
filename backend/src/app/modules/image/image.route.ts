import express from "express";
import multer from 'multer';

import { imageControllers } from "./image.controller";
const router = express.Router();

//-----Multer configuration-----
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


//--------------------routes------------
router.post('/upload-properties', upload.array('propertyImage', 5), imageControllers.uploadPropertyImages);
router.post('/upload-profile', upload.single('profileImage'), imageControllers.uploadProfileImage);
router.post('/upload-services', upload.array('serviceImages', 3), imageControllers.uploadServiceImages);

export const imageRoutes = router;