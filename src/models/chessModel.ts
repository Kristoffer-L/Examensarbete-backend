import mongoose from "mongoose";

export interface IChess extends Document {
  _id: mongoose.Types.ObjectId;
  fen: string;
  white: mongoose.Types.ObjectId;
  black: mongoose.Types.ObjectId;
  winner: mongoose.Types.ObjectId | null;
  result: "white" | "black" | "draw" | null;
  status: "pending" | "active" | "finished";
  createdAt: Date;
  finishedAt: Date | null;
}

const chessSchema = new mongoose.Schema({
  fen: {
    type: String,
    required: true,
  },
  white: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  black: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  winner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  },
  result: {
    type: String,
    enum: ["white", "black", "draw"],
    default: null,
  },
  status: {
    type: String,
    enum: ["pending", "active", "finished"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  finishedAt: {
    type: Date,
    default: null,
  },
});

const Chess = mongoose.model<IChess>("Chess", chessSchema);
export default Chess;
