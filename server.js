const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Create a corsOptions object to configure CORS settings
const corsOptions = {
  origin: "*", // Replace with the actual origin of your frontend
};

const io = socketIo(server, {
  cors: corsOptions, // Apply the corsOptions to socket.io
});

const PORT = 4000;

app.use(cors()); // Use cors middleware for non-socket routes

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (payload) => {
    console.log("Message received " + payload);
    io.emit("message", payload);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
