import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import type { TUserRegistration } from "../utils/types/registerUserType";
import { serverBaseUrl } from "../utils/baseUrl";
import { format } from "date-fns";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const authcontext = useContext(AuthContext);

  if (!authcontext) {
    throw new Error("Authentication context is not available.");
  }
  const { EmailPassSignUp , setSelfId } = authcontext;

  const register = async (form: TUserRegistration) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const { email, password, profileImage, ...userDataForBackend } = form;

      const profileImageFile =
        profileImage && profileImage.length > 0 ? profileImage[0] : null;

      let uploadedProfileImageUrl: string | null = null;

      // -----------Firebase user registration-----------------
      const authResponse = await EmailPassSignUp(email, password);

      if (!authResponse?.user) {
        throw new Error("Firebase registration failed. No user data received.");
      }

      // ---------------Upload profile image to aws-------------
      if (profileImageFile) {
        const imageFormData = new FormData();
        imageFormData.append("profileImage", profileImageFile);

        const imageUploadResponse: any = await serverBaseUrl.post(
          "/image/upload-profile",
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (
          !imageUploadResponse.data?.success ||
          !imageUploadResponse.data?.data?.url
        ) {
          throw new Error(
            imageUploadResponse.data?.message ||
              "Profile image upload failed after successful registration."
          );
        }
        uploadedProfileImageUrl = imageUploadResponse.data.data.url;
      }

      //---------- final user data for backend-------------
      const userData = {
        ...userDataForBackend,
        dateOfBirth: userDataForBackend.dateOfBirth
          ? format(userDataForBackend.dateOfBirth, "yyyy-MM-dd")
          : null,
        profileImage: uploadedProfileImageUrl,
        address: {
          street: userDataForBackend.address.street,
          city: userDataForBackend.address.city,
          postalCode: userDataForBackend.address.postalCode,
        },
        email: email, 
        phoneNumber: userDataForBackend.phoneNumber,
        nid: userDataForBackend.nid,
        gender: userDataForBackend.gender,
        nationality: userDataForBackend.nationality,
        occupation: userDataForBackend.occupation,
        socialMedia: userDataForBackend.socialMedia,
      };

      const res = await serverBaseUrl.post("/user/create-new", userData);
      setSelfId(res?.data?.data?._id);
      setSuccess(true);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during registration.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
}
