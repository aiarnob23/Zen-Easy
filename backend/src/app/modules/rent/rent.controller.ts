import catchAsync from "../../utils/catchAsync";
import { errorResponse } from "../../utils/errorResponse";
import sendResponse from "../../utils/sendResponse";
import { rentServices } from "./rent.service";
import { Request, Response } from "express";

//fetch all rent posts
const fetchAllRentPosts = catchAsync(
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
const createNewRentAd = catchAsync(
  async (req: Request, res: Response) => {
    const result = await rentServices.createRentAd(req?.body);
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
const updateRentPostStatus = catchAsync(async(req,res)=>{
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
const updateRentPostDetails = catchAsync(async(req,res)=>{
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

//view a rent details
const getRentDetails = catchAsync(async(req,res)=>{
  const _id = req?.params?.id;
  const result = await rentServices.viewRentDeails(_id as string);
  if(result){
    sendResponse(res,{
      success:true,
      statusCode:200,
      message:"Rent details fetched successfully",
      data:result,
    })
  }
  sendResponse(res,{
    success:false,
    statusCode:404,
    message:"Failed to fetch rent post details",
    data:null,
  })
})

export const rentController = {
    fetchAllRentPosts,
    createNewRentAd,
    updateRentPostStatus,
    updateRentPostDetails,
    getRentDetails,
}