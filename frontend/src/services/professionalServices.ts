import { serverBaseUrl } from "../utils/baseUrl"

//get the user's total service count
export const getUsersProfessionalInfo = async(id:string) => {
    const response = await serverBaseUrl.get(`/user/professional-details/${id}`);
    return response?.data?.data;
}