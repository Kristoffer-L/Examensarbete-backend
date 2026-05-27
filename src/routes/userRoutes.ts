import express from "express";
import router from "express";
import { getAllUsers } from "../controllers/userControllers.js";
const userRoutes = router.Router();

userRoutes.get("/", getAllUsers);

export default userRoutes;
