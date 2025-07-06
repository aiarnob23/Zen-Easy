import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TProfessinalService } from "./profservice.interface";
import { professionHandlerService } from "./profservice.service";

//create new user service profile 
const createNewServiceProfile = catchAsync(async(req,res)=>{
    const _id = req?.params?.id;
    const payload = req?.body;
    const result = await professionHandlerService.createNewService(_id as string, payload as TProfessinalService);
    if(result){
        sendResponse(res, {
            success:true,
            statusCode:200,
            message:"new service profile created",
            data:result,
        })
    }
    sendResponse(res,{
        success:false,
        statusCode:500,
        message:"service profile creation failed",
        data:null
    })
})

//get user's professional profiles
const getUsersProfessionalProfiles = catchAsync(async(req,res)=>{
    const _id = req?.params?.id;
    const result = await professionHandlerService.getUserProfessionalProfiles(_id as string);
      if(result){
        sendResponse(res, {
            success:true,
            statusCode:200,
            message:"user's professional profiles fetched successfully",
            data:result,
        })
    }
    sendResponse(res,{
        success:false,
        statusCode:404,
        message:"Failed to fetch service profile",
        data:null
    })
})

//update professional profile
const updateProfessionalProfile = catchAsync(async(req,res)=>{
    const _id = req?.params?.id;
    const payload = req?.body;
    const result = await professionHandlerService.updateProfessionalProfile(_id, payload);
     if(result){
        sendResponse(res, {
            success:true,
            statusCode:200,
            message:"user's professional profile updated successfully",
            data:result,
        })
    }
    sendResponse(res,{
        success:false,
        statusCode:500,
        message:"Failed to update user's professional profile",
        data:null
    })
})

//find services 
const findServices = catchAsync(async(req,res)=>{
    const category = req?.params?.category;
    const result = await professionHandlerService.findServices(category as string);
     if(result){
        sendResponse(res, {
            success:true,
            statusCode:200,
            message:"Services found",
            data:result,
        })
    }
    sendResponse(res,{
        success:false,
        statusCode:404,
        message:"Failed to find services",
        data:null
    })
})

export const profHandlerControllers = {
    createNewServiceProfile,
    updateProfessionalProfile,
    getUsersProfessionalProfiles,
    findServices,
}