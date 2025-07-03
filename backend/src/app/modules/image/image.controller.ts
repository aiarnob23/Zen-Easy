import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ImageService, MulterFile } from "./image.service";
import sendResponse from "../../utils/sendResponse";
import { errorResponse } from "../../utils/errorResponse";

//------------------multiple property images---------------------
const uploadPropertyImages = catchAsync(async (req: Request, res: Response) => {
  const uploadedFiles = (req.files as MulterFile[]) || [];

  if (!uploadedFiles || uploadedFiles.length === 0) {
    errorResponse(
      'No property images found in the request. Ensure "propertyImage" field is used.',
      400
    );
    return;
  }

  const imageUrls = await ImageService.uploadFilesToS3(
    uploadedFiles,
    "property_images"
  );
  if (imageUrls.length === 0) {
    errorResponse("Failed to upload any property images to AWS S3.", 400);
    return;
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Property images uploaded successfully",
    data: { urls: imageUrls },
  });
});

//--------------------single user profile image--------------------
const uploadProfileImage = catchAsync(async (req: Request, res: Response) => {
  const file = req.file as MulterFile | undefined;

  if (!file) {
    errorResponse(
      'No profile image found in the request. Ensure "profileImage" field is used.',
      400
    );
    return;
  }
  const imageUrl = await ImageService.uploadFileToS3(file, "profile_images");

  if (!imageUrl) {
    errorResponse("Failed to upload profile image to AWS S3.", 400);
    return;
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile image uploaded successfully",
    data: { url: imageUrl },
  });
});

//-------------multiple service images---------------------
const uploadServiceImages = catchAsync(async (req: Request, res: Response) => {
  const files = (req.files as MulterFile[]) || [];

  if (!files || files.length === 0) {
    errorResponse(
      'No service images found in the request. Ensure "serviceImages" field is used.',
      400
    );
    return;
  }

  const imageUrls = await ImageService.uploadFilesToS3(files, "service_images");

  if (imageUrls.length === 0) {
    errorResponse("Failed to upload any service images to AWS S3.", 500);
    return;
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service images uploaded successfully",
    data: { urls: imageUrls },
  });
});

export const imageControllers = {
  uploadPropertyImages,
  uploadProfileImage,
  uploadServiceImages,
};
