import { TUser } from "./user.interface";
import User from "./user.model";

// create new user 
const createNewUser = async(payload:TUser)=> {
    const result = await User.create(payload);
    return result;
}

//edit user details 
const updateUserDetails = async(_id:string, payload:TUser)=>{
    const result = await User.findByIdAndUpdate(_id, payload, {new:true});
    return result;
}

//get user details
const getUserDetails = async(_id:string)=>{
    const result = User.findById(_id);
    return result;
}



export const userServices = {
    createNewUser,
    updateUserDetails,
    getUserDetails,
}