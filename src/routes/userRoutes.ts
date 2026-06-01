import { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
} from "../controllers/userController.js";
const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUser);
userRoutes.post("/", createUser);
userRoutes.delete("/", deleteUser);

export default userRoutes;
