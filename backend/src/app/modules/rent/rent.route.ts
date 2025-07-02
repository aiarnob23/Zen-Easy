import express from "express";
import { rentController } from "./rent.controller";
const router = express.Router();

router.get('/rent-posts', rentController.fetchAllRentPosts);
router.post('/create', rentController.createNewRentAd);
router.patch(`/update/:id`, rentController.updateRentPostDetails);
router.patch(`/update-status/:id`, rentController.updateRentPostStatus);

export const rentRoutes = router;