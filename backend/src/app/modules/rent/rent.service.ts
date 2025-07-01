import Rent from "./rent.model"


//get all rent posts
const getRentPosts = async() => {
    const result = await Rent.find();
    return result;
}

export const rentServices = {
    getRentPosts,
}