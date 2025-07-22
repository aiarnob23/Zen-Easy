import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import type { TUserRegistration } from "../utils/types/registerUserType";
import { serverBaseUrl } from "../utils/baseUrl";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { generateSignInToken } from "../services/authServices";

//------------ Image optimization ---------
const compressImage = (file: File, quality: number = 0.7): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const maxWidth = 800;
      const maxHeight = 600;
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        "image/jpeg",
        quality
      );
    };

    img.src = URL.createObjectURL(file);
  });
};

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState<string>("");

  const authcontext = useContext(AuthContext);

  if (!authcontext) {
    throw new Error("Authentication context is not available.");
  }
  const { EmailPassSignUp } = authcontext;

  const register = async (form: TUserRegistration) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setProgress("Starting registration...");

    try {
      const { email, password, profileImage, ...userDataForBackend } = form;
      const profileImageFile =
        profileImage && profileImage.length > 0 ? profileImage[0] : null;

      // ------------------ Firebase registration --------------
      setProgress("Creating account...");
      const authResponse = await EmailPassSignUp(email, password);

      if (!authResponse?.user) {
        throw new Error("Firebase registration failed. No user data received.");
      }

      // ------------ Prepare user data -----------------
      const baseUserData = {
        ...userDataForBackend,
        dateOfBirth: userDataForBackend.dateOfBirth
          ? format(userDataForBackend.dateOfBirth, "yyyy-MM-dd")
          : null,
        email: email,
        phoneNumber: userDataForBackend.phoneNumber,
        nid: userDataForBackend.nid,
        gender: userDataForBackend.gender,
        nationality: userDataForBackend.nationality,
        occupation: userDataForBackend.occupation,
        address: {
          street: userDataForBackend.address.street,
          city: userDataForBackend.address.city,
          postalCode: userDataForBackend.address.postalCode,
        },
        socialMedia: userDataForBackend.socialMedia,
        profileImage: null,
      };

      let finalUserData = baseUserData;

      // ---------------Handle image upload --------------
      const promises: Promise<any>[] = [];

      if (profileImageFile) {
        setProgress("Optimizing profile image...");
        const imagePromise = compressImage(profileImageFile).then(
          async (compressedFile) => {
            setProgress("Uploading profile image...");
            const imageFormData = new FormData();
            imageFormData.append("profileImage", compressedFile);

            const imageUploadResponse = await serverBaseUrl.post(
              "/image/upload-profile",
              imageFormData,
              {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
                timeout: 30000,
              }
            );

            if (
              !imageUploadResponse.data?.success ||
              !imageUploadResponse.data?.data?.url
            ) {
              throw new Error(
                imageUploadResponse.data?.message ||
                  "Profile image upload failed"
              );
            }

            return imageUploadResponse.data.data.url;
          }
        );
        promises.push(imagePromise);
      }

      // ----------Execute promises---------
      setProgress("Saving your information...");

      if (promises.length > 0) {
        // Wait for image upload, then create user
        const [uploadedImageUrl] = await Promise.all(promises);
        finalUserData.profileImage = uploadedImageUrl;
      }

      // -------------Create user --------------
      const userResponse = await serverBaseUrl.post(
        "/user/create-new",
        finalUserData,
        {
          timeout: 15000,
        }
      );

      if (!userResponse?.data?.success) {
        throw new Error(
          userResponse?.data?.message || "Failed to create user account"
        );
      }

      // --------------------- Generate token----------------
      setProgress("Finalizing registration...");
      const token = await generateSignInToken(userResponse.data.data._id);

      // -------------Set cookies--------------
      Cookies.set("zenEasySelfToken", token.data, { expires: 14 });
      Cookies.set("zenEasySelfId", userResponse.data.data._id);

      setProgress("Registration completed!");
      setSuccess(true);
    } catch (err: any) {
      console.error("Registration error:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during registration.");
      }
    } finally {
      setLoading(false);
      setProgress("");
    }
  };

  return { register, loading, error, success, progress };
}
