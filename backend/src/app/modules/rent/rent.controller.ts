import catchAsync from "../../utils/catchAsync";
import { errorResponse } from "../../utils/errorResponse";
import sendResponse from "../../utils/sendResponse";
import { rentServices } from "./rent.service";
import { Request, Response } from "express";

//fetch all rent posts
export const fetchAllRentPosts = catchAsync(
  async (req: Request, res: Response) => {
    const result = await rentServices.getRentPosts();
    if (result) {
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rent posts fetched successfully",
        data: result,
      });
    }

    errorResponse("Data not found!",404);
  }
);


//create a rent ad
export const createNewRentAd = catchAsync(
  async (req: Request, res: Response) => {
    const result = await rentServices.createRentAd(req?.body?.rentData);
    if (result) {
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rent post created successfully",
        data: result,
      });
    }
    errorResponse("Post creation failed", 400)
  }
);

//update rent post status 
export const updateRentPostStatus = catchAsync(async(req,res)=>{
  const result = await rentServices.updateRentAdStatus(req?.params?.id, req?.body?.rentPostStatus);
  if(result){
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rent post's status has changed",
        data: result,
      });
  }
  errorResponse("Failed to update the status of rent ad", 400);
})

//update rent post details 
export const updateRentPostDetails = catchAsync(async(req,res)=>{
  const result = await rentServices.updateRentAd(req?.params?.id, req?.body?.rentPostData);
  if(result){
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rent post updated successfully",
        data: result,
      });
  }
  errorResponse("Failed to update the rent ad", 400);
})


export const rentController = {
    fetchAllRentPosts,
    createNewRentAd,
    updateRentPostStatus,
    updateRentPostDetails,
}