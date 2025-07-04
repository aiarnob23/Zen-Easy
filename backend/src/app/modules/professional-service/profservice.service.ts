import User from "../user/user.model";
import { TProfessinalService } from "./profservice.interface";
import { ProfessionalService } from "./profservice.model";

// create a new user service
const createNewService = async (_id: string, payload: TProfessinalService) => {
  const result = await ProfessionalService.create(payload);
  if (result?._id) {
    const finalResult = await User.findByIdAndUpdate(
      _id,
      { $push: { professionalProfiles: result._id } },
      { new: true }
    );
    return finalResult;
  }
};

//get user's professional profiles details
const getUserProfessionalProfilesDetails = async (_id: string) => {
  const result = await ProfessionalService.findById(_id);
  return result;
};

//update professional profile
const updateProfessionalProfile = async (
  _id: string,
  payload: TProfessinalService
) => {
  const result = await ProfessionalService.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};
