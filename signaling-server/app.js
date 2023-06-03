const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  options: {
    cors: "*",
  },
});

const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

io.on("connection", (socket) => {
  console.log("Connection 🟢");

  socket.on("m", (msg) => {
    console.log("message: " + msg);
  });

  socket.on("hello", (msg) => console.log(msg));
  socket.on("join", (data) => {
    console.log("DATA 📅: ", data);
    const roomName = data.roomName;
    socket.join(roomName);
    socket.to(roomName).broadcast.emit("new-user", data);

    socket.on("disconnect", () => {
      console.log("Disconnecting...");
      socket.to(roomName).broadcast.emit("bye-user", data);
    });
  });
});

server.listen(port, () => {
  console.log(`Server running port ${port}`);
});
