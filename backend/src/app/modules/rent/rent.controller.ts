import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { rentServices } from "./rent.service";

//fetch all rent posts
import { Request, Response } from "express";

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
  }
);


export const rentController = {
    fetchAllRentPosts,
}