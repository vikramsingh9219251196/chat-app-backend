const express = require("express");

const app = require("./app");
const connectDB = require("./db/index");
const http = require("http");

const socket = require("socket.io");
require("dotenv").config();
const colors = require("colors");

app.use(express.json());
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running at port : ${PORT}`.bgBlue);
    });

    const io = socket(server, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });

    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
      global.chatSocket = socket;
      socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
      });
     
      socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
      });
      
      
    });
    
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ".bgRed, err);
  });
