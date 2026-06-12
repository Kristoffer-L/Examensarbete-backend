import type { Request, Response } from "express";
import type { AuthRequest, AuthParamsRequest } from "../types/AuthRequest.js";

import Chess from "../models/chessModel.js";
import User from "../models/userModel.js";

const getAllChessMatches = async (req: Request, res: Response) => {
  try {
    const chessMatches = await Chess.find();
    res.json(chessMatches);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "Unknown error",
      });
    }
  }
};

const getChessMatch = async (req: AuthParamsRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const user = await User.findById(userId);
    const chessMatch = await Chess.findById(req.params.id)
      .populate("white", "name email")
      .populate("black", "name email");
    if (!chessMatch) {
      return res.status(404).json({ message: "Chess match not found" });
    }
    res.json({ chessMatch, user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "Unknown error",
      });
    }
  }
};

const createChessMatch = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const chessMatch = await Chess.create({
      ...req.body,
      white: userId,
    });
    res.status(201).json(chessMatch);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "Unknown error",
      });
    }
  }
};

const updateChessMatch = async (req: Request, res: Response) => {
  try {
    const chessMatch = await Chess.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(chessMatch);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "Unknown error",
      });
    }
  }
};

const deleteChessMatch = async (req: Request, res: Response) => {
  try {
    const chessMatch = await Chess.findByIdAndDelete(req.params.id);
    if (!chessMatch) {
      return res.status(404).json({ message: "Chess match not found" });
    }
    res.json({ message: "Chess match deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "Unknown error",
      });
    }
  }
};

export {
  getAllChessMatches,
  getChessMatch,
  createChessMatch,
  updateChessMatch,
  deleteChessMatch,
};
