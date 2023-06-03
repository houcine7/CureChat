const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:4200"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hey Socket.io</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("hello", (res) => console.log(res));

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  io.on("connection", (socket) => {
    socket.on("my message", (msg) => {
      console.log(msg);
      io.emit("my broadcast", `server: ${msg}`);
    });

    socket.on("join", (data) => {
      const roomName = data.roomName;
      socket.join(roomName);
      socket.broadcast.to(roomName).emit("new-user", data);

      socket.on("disconnect", () => {
        socket.broadcast.to(roomName).emit("bye-user", data);
      });
    });
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
