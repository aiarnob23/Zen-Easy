import express from "express";
import { adminControllers } from "./admin.controller";
import { verifyToken } from "../../middlewares/verifyToken";
import { profHandlerControllers } from "../professional-service/profservice.controller";

const router = express.Router();

/* -------- AUTH -------- */
router.post("/login", adminControllers.loginAdmin);

//-------Prof Service CRUD--------------//
router.get('/all-prof-services', adminControllers.getAllProfServices);
router.patch(`/service-profile/:id`, profHandlerControllers.updateProfessionalProfile);

/* -------- USERS -------- */
router.get("/users", adminControllers.getAllUsers);
router.delete("/users/:id", verifyToken, adminControllers.deleteUser);

/* -------- RENTS -------- */
router.get("/rents", verifyToken, adminControllers.getAllRents);
router.delete("/rents/:id", verifyToken, adminControllers.deleteRent);

export const adminRoutes = router;
