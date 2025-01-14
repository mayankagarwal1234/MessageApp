const Messages = require("../model/messageModel");


module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.query; // Use query params for GET requests

    if (!from || !to) {
      return res.status(400).json({ msg: "Both 'from' and 'to' fields are required." });
    }

    // Fetch messages where both users are part of the conversation
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ createdAt: 1 });

    // Project the message data for the frontend
    const projectedMessages = messages.map((msg) => ({
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    }));

    return res.status(200).json(projectedMessages); // Return the list of messages
  } catch (ex) {
    next(ex); // Pass the error to middleware for handling
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    if (!from || !to || !message) {
      return res.status(400).json({ msg: "'from', 'to', and 'message' fields are required." });
    }

    // Create and save a new message to the database
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.status(201).json({ msg: "Message added successfully." });
    } else {
      return res.status(500).json({ msg: "Failed to add message to the database." });
    }
  } catch (ex) {
    next(ex); // Pass the error to middleware for handling
  }
};

