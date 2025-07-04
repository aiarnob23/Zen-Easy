import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/create-new", userControllers.createNewUser);
router.patch("/update-details", userControllers.editUserDetails);
router.get(`/find-info/:id`, userControllers.getUserDetails);
router.post("/find-id", userControllers.getUserId);
router.patch(`/generate-otp/:id`, userControllers.updateUsersOTP);
router.post(`/validate-otp/:id`, userControllers.validateUsersOTP);
router.get(
  `/professional-details/:id`,
  userControllers.getUsersProfessionalServices
);

export const userRoutes = router;
