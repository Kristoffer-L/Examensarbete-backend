import { Router } from "express";
import {
  getAllUsers,
  getAllOtherUsers,
  getUser,
  getUserAndMatches,
  createUser,
  deleteUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/other-users", authMiddleware, getAllOtherUsers);
userRoutes.get("/me", authMiddleware, getUser);
userRoutes.get("/matches", authMiddleware, getUserAndMatches);
userRoutes.post("/", createUser);
userRoutes.delete("/", deleteUser);

export default userRoutes;
