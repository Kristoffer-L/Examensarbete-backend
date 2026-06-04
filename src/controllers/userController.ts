import type { Request, Response } from "express";
import User from "../models/userModel.js";
import Chess from "../models/chessModel.js";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error creating user" });
  }
};

const getAllUsers = async (req: any, res: Response) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getUser = async (req: any, res: Response) => {
  try {
    const UserId = req.user.id;
    const user = await User.findById(UserId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

const getAllOtherUsers = async (req: any, res: Response) => {
  try {
    const UserId = req.user.id;
    const users = await User.find({
      _id: { $ne: UserId },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getUserAndMatches = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matches = await Chess.find({
      $or: [{ whitePlayer: userId }, { blackPlayer: userId }],
    })
      .populate("whitePlayer", "name email")
      .populate("blackPlayer", "name email");

    res.json({ user, matches });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
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
