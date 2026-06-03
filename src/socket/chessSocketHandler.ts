import { Server, Socket } from "socket.io";

const chessSocketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("USER CONNECTED:", socket.id);

    socket.on("join-game", (gameId) => {
      socket.join(gameId);

      console.log("joined room:", gameId);
    });

    socket.on("move", ({ gameId, move }) => {
      console.log("move:", gameId, move);

      socket.to(gameId).emit("move", move);
    });

    socket.on("disconnect", () => {
      console.log("user discornected:", socket.id);
    });
  });
};

export default chessSocketHandler;
