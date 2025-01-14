const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Route to get messages between two users
router.get("/getmsg", messageController.getMessages);

// Route to add a new message
router.post("/addmsg", messageController.addMessage);

module.exports = router;
