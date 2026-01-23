import { serverBaseUrl } from "../utils/baseUrl";
import type { TProfessionalService } from "../utils/types/profServiceTypes";

/* ---------------- AUTH ---------------- */
export const signInAdmin = async (email: string, password: string) => {
  const response = await serverBaseUrl.post("/admin/login", {
    email,
    password,
  });

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to login");
  }

  return response.data;
};

/* ---------------- PROFESSIONAL SERVICES ---------------- */


export const getAllProfServices = async (): Promise<TProfessionalService[]> => {
  const res = await serverBaseUrl.get("/admin/all-prof-services");
  return res.data.data;
};

export const updateProfService = async (
  id: string,
  payload: Partial<TProfessionalService>
): Promise<TProfessionalService> => {
  const res = await serverBaseUrl.patch(`/admin/service-profile/${id}`, payload);
  return res.data.data;
};


//----------------User services------------//
export const getUserById = async (id: string) => {
  const res = await serverBaseUrl.get(`/user/find-info/${id}`);
  return res.data.data;
};
