import type { Request, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.js";

import User from "../models/userModel.js";
import Chess from "../models/chessModel.js";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json(users);
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

const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const UserId = req.user!.id;
    const user = await User.findById(UserId);
    res.json(user);
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

const getAllOtherUsers = async (req: AuthRequest, res: Response) => {
  try {
    const UserId = req.user!.id;
    const users = await User.find({
      _id: { $ne: UserId },
    });
    res.json(users);
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

const getUserAndMatches = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matches = await Chess.find({
      $or: [{ white: userId }, { black: userId }],
    })
      .populate("white", "name email")
      .populate("black", "name email");

    res.json({ user, matches });
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

const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
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
  getAllUsers,
  getUser,
  getAllOtherUsers,
  getUserAndMatches,
  createUser,
  deleteUser,
};
