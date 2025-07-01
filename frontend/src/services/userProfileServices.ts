import { serverBaseUrl } from "../utils/baseUrl";
import { fakeData } from "../utils/fake";

// self profile data
export const getUserProfileDetails = async () => {
  // try {
  //     const response = await fetch(`${serverBaseUrl}/profile/self`, {
  //         method: 'GET',
  //         credentials: 'include',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         }
  //     });
  //     if (!response.ok) {
  //         throw new Error(`Error: ${response.status}`);
  //     }
  //     return await response.json();
  // } catch (error) {
  //     console.error('Failed to fetch self profile details:', error);
  //     throw error;
  // }
  const data = fakeData.User;

  return {success:true, res : data};
};
