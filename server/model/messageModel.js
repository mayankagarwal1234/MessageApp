const mongoose = require("mongoose");

// Define the schema for the message model
const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true }, // Message content (text)
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // This will reference the "User" model
      },
    ],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This will reference the "User" model for the sender
      required: true, // Ensures that sender is provided
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Messages model
module.exports = mongoose.model("Messages", MessageSchema);
