import type { Request, Response } from "express";
import Chess from "../models/chessModel.js";

const getAllChessMatches = async (req: Request, res: Response) => {
  try {
    const chessMatches = await Chess.find();
    res.json(chessMatches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching matches" });
  }
};

const getChessMatch = async (req: Request, res: Response) => {
  try {
    const chessMatch = await Chess.findById(req.params.id)
      .populate("whitePlayer", "name email")
      .populate("blackPlayer", "name email");
    if (!chessMatch) {
      return res.status(404).json({ message: "Chess match not found" });
    }
    res.json(chessMatch);
  } catch (error) {
    res.status(500).json({ message: "Error fetching match" });
  }
};

const createChessMatch = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const chessMatch = await Chess.create({
      ...req.body,
      whitePlayer: userId,
    });
    res.status(201).json(chessMatch);
  } catch (error) {
    res.status(500).json({ message: "Error creating match" });
  }
};

const updateChessMatch = async (req: Request, res: Response) => {
  try {
    const chessMatch = await Chess.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(chessMatch);
  } catch (error) {
    res.status(500).json({ message: "Error updating match" });
  }
};

const deleteChessMatch = async (req: Request, res: Response) => {
  try {
    const chessMatch = await Chess.findByIdAndDelete(req.params.id);
    if (!chessMatch) {
      return res.status(404).json({ message: "Chess match not found" });
    }
    res.json({ message: "Chess match deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting chess match" });
  }
};

export {
  getAllChessMatches,
  getChessMatch,
  createChessMatch,
  updateChessMatch,
  deleteChessMatch,
};
