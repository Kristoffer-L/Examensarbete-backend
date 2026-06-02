import { Router } from "express";
import {
  getAllChessMatches,
  getChessMatch,
  createChessMatch,
  deleteChessMatch,
  updateChessMatch,
} from "../controllers/chessController.js";
const chessRoutes = Router();

chessRoutes.get("/", getAllChessMatches);
chessRoutes.get("/:id", getChessMatch);
chessRoutes.post("/", createChessMatch);
chessRoutes.patch("/:id", updateChessMatch);
chessRoutes.delete("/", deleteChessMatch);

export default chessRoutes;
