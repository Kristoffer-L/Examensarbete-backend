import { Router } from "express";
import {
  getAllChessMatches,
  getChessMatch,
  createChessMatch,
  deleteChessMatch,
  updateChessMatch,
} from "../controllers/chessController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const chessRoutes = Router();

chessRoutes.get("/", getAllChessMatches);
chessRoutes.get("/:id", authMiddleware, getChessMatch);
chessRoutes.post("/", authMiddleware, createChessMatch);
chessRoutes.patch("/:id", updateChessMatch);
chessRoutes.delete("/", deleteChessMatch);

export default chessRoutes;
