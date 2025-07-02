// src/app/modules/image/image.controller.ts
import { Request, Response } from 'express';
import catchAsync from "../../utils/catchAsync"; 
import { ImageService, MulterFile } from './image.service'; 
import sendResponse from '../../utils/sendResponse';


type CustomRequest = Request & {
  files?: MulterFile[]; 
};

const uploadImageToDB = catchAsync(async (req: Request, res: Response): Promise<void> => {
  console.log('Image upload request received in controller.');

  const uploadedFiles = (req.files as MulterFile[]) || [];

  if (!uploadedFiles || uploadedFiles.length === 0) {
    res.status(400).json({
      success: false,
      message: 'No images found in the request. Ensure "propertyImage" field is used.',
    });
    return;
  }

  const imageUrls = await ImageService.uploadImagesToS3(uploadedFiles);

  if (imageUrls.length === 0) {
    res.status(500).json({
      success: false,
      message: 'Failed to upload any images to AWS S3.',
    });
    return;
  }
  sendResponse(res,{
    statusCode:200,
    success:true,
    message:"Images uploaded successfully",
    data:imageUrls
  })
});

export const imageControllers = {
  uploadImageToDB,
};