import express from "express";
import { rentController } from "./rent.controller";
const router = express.Router();

router.get('/rent-posts', rentController.fetchAllRentPosts);

export const rentRoutes = router;