import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const SocialMediaSchema = new Schema({
  facebook: {
    type: String,
    required: false, 
    trim: true,     
  },
  instagram: {
    type: String,
    required: false,
    trim: true,
  },
  linkedin: {
    type: String,
    required: false,
    trim: true,
  },
}, { _id: false }); 

const RentSchema: Schema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        profileImage: {
            type: String,
            required: false,
            trim: true,
        },
        nid: {
            type: String,
            required: false,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
            trim: true,
        },
        nationality: {
            type: String,
            required: true,
            trim: true,
        },
        occupation: {
            type: String,
            required: false,
            trim: true,
        },
        professionalProfiles: {
            type: [String],
            required: false,
        },
        socialMedia: {
            type: SocialMediaSchema,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = model<TUser>("User", RentSchema);
export default User;
