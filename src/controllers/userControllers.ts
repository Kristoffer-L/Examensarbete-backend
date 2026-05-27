import type { Request, Response } from "express";
import User from "../models/userModel.js";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export { getAllUsers };
