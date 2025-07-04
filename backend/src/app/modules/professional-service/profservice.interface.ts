export type TProfessinalService = {
    provider:string;
    category : TServiceCategory;
    contactNumber:string;
    addressLine:string;
    serviceArea:string[];
    description:string;
    minimumPrice:number;
    maximumPrice:number;
    availableDays:string[];
    availableTime:"day" | "night" | "always";
    coverImage?:string;
    ratings?:TRating[];
    status?:'active' | 'inactive';
}


export type TServiceCategory = "Maid" | "Tutor" | "Electrician" | "IT Consultant" | "Painter" | "Plumber" ;
export type TRating = {
    client:string;
    rating:number;
    feedback:string;
}
