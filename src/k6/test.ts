import ws from "k6/ws";

export const options = {
  scenarios: {
    first_scenario: {
      executor: "constant-vus",
      vus: 25,
      duration: "30s",
    },
  },
};

export default function () {
  const url = `wss://examensarbete-backend-2469.onrender.com/socket.io/?EIO=4&transport=websocket`;

  ws.connect(url, {}, function (socket) {
    let connected = false;

    socket.on("message", (msg) => {
      if (msg.startsWith("0")) {
        connected = true;

        socket.send("40");
        socket.send('42["message","hello"]');
      }
    });

    // 🔥 KEEP CONNECTION ALIVE
    socket.setTimeout(() => {
      socket.close();
    }, 30000);
  });
}
