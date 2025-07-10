import { useState } from "react";
import { uploadServiceImage } from "../services/imageUploadService"; 

type EditServiceFormData = Omit<any, '_id' | 'provider' | 'minimumPrice' | 'maximumPrice' | 'availableDays' | 'availableTime' | 'coverImage' | 'ratings' | 'status' | 'createdAt' | 'updatedAt'> & {
    serviceAreas: { value: string }[]; 
    priceRange: {
        min: number;
        max: number;
    };
    dayOfWeek: string[]; 
    availableTimes: "day" | "night" | "always"; 
    coverImageFile?: FileList; 
    existingCoverImage?: string;
};


export function useEditService() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);


    const updateService = async (serviceId: string, formData: EditServiceFormData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            let coverImageUrl: string | undefined = formData.existingCoverImage; // Start with existing image

            // ------------ cover image upload-----------------
            if (formData.coverImageFile && formData.coverImageFile.length > 0) {
                const file = formData.coverImageFile[0];
                const uploadedUrl = await uploadServiceImage(file);
                if (!uploadedUrl) {
                    throw new Error("Failed to upload new cover image.");
                }
                coverImageUrl = uploadedUrl; 
            } else if (formData.existingCoverImage === '') {
                coverImageUrl = undefined;
            }

            const finalServiceAreas = formData.serviceAreas
                .map(item => item.value.trim())
                .filter(area => area.length > 0);

            // -------------- final data payload-------------
            const payload: Partial<any> = {
                category: formData.category,
                status:formData.status,
                contactNumber: formData.contactNumber,
                addressLine: formData.addressLine,
                serviceArea: finalServiceAreas,
                description: formData.description,
                minimumPrice: formData.priceRange.min,
                maximumPrice: formData.priceRange.max,
                availableDays: formData.dayOfWeek,
                availableTime: formData.availableTimes,
                coverImage: coverImageUrl, 
            };

            //------------------- update request to backend--------------
            
            console.log("Updating service ID:", serviceId, "with data:", payload);
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

            setSuccess(true);
        } catch (err: any) {
            console.error("Error updating service:", err);
            setError(err.message || "An error occurred while updating the service.");
        } finally {
            setLoading(false);
        }
    };

    return {  updateService, loading, error, success };
}