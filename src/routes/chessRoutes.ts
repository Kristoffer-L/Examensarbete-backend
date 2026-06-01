import { Router } from "express";
import {
  getAllChessMatches,
  getChessMatch,
  createChessMatch,
  deleteChessMatch,
} from "../controllers/chessController.js";
const chessRoutes = Router();

chessRoutes.get("/", getAllChessMatches);
chessRoutes.get("/:id", getChessMatch);
chessRoutes.post("/", createChessMatch);
chessRoutes.delete("/", deleteChessMatch);

export default chessRoutes;
