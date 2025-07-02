import User from "../user/user.model";
import { TRent } from "./rent.interface";
import Rent from "./rent.model";

//get all rent posts
const getRentPosts = async () => {
  const result = await Rent.find();
  return result;
};

//create a rent ad
const createRentAd = async (payload: TRent) => {
  const result = await Rent.create(payload);
  if (result?._id) {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      await Rent.findByIdAndDelete(result._id);
      throw new Error(
        "User not found for the given email. Rent ad creation aborted."
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: payload.email },
      { $push: { rentPosts: result._id } },
      { new: true, runValidators: true }
    );
    return { rentAd: result, updatedUser: updatedUser };
  }
  return null;
};


//update rent ad status
const updateRentAdStatus = async(_id:string , status:string)=>{
    const result = Rent.findByIdAndUpdate(_id , {status:status} , {new:true});
    return result;
}

//update rent ad 
const updateRentAd = async(_id:string, payload:TRent) => {
    const result = await Rent.findByIdAndUpdate(_id, payload, {new:true});
    return result;
}

export const rentServices = {
  getRentPosts,
  createRentAd,
  updateRentAd,
  updateRentAdStatus,
};
