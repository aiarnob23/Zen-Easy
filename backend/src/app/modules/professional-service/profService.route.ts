import express from "express";
import { profHandlerControllers } from "./profservice.controller";
const router = express.Router();

router.post(`/create-profile/:id`, profHandlerControllers.createNewServiceProfile);
router.get(`/view-profile/:id`, profHandlerControllers.getUsersProfessionalProfiles);
router.post(`/update-profile/:id`, profHandlerControllers.updateProfessionalProfile);
router.get(`/find-services/:category` , profHandlerControllers.findServices);

export const profHandleRoutes = router;