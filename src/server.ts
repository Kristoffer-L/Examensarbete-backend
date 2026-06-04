import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { createServer } from "http";
import { Server } from "socket.io";
import chessSocketHandler from "./socket/chessSocketHandler.js";

import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import chessRoutes from "./routes/chessRoutes.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://examensarbete-frontend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/chess", chessRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://examensarbete-frontend.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

chessSocketHandler(io);

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
