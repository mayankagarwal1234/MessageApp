const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messages");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
    process.exit(1); // Exit process if DB connection fails
  });

// Server Initialization
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

// Socket.IO Setup
const io = socket(server, {
  cors: {
    origin: "https://chit-chat-server-3qsc.onrender.com/",
    credentials: true,
  },
});

// Online Users Map
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Add user to online users
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User added: ${userId} -> ${socket.id}`);
  });

  // Handle message sending
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      io.to(sendUserSocket).emit("msg-recieve", data.msg);
      console.log(`Message sent from ${data.from} to ${data.to}: ${data.msg}`);
    } else {
      console.log(`User ${data.to} is not online.`);
    }
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    // Remove user from online users map
    for (const [userId, id] of onlineUsers.entries()) {
      if (id === socket.id) {
        onlineUsers.delete(userId);
        console.log(`User removed: ${userId}`);
        break;
      }
    }
  });
});
