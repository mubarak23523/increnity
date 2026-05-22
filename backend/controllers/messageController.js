const Message = require("../models/Message");

// Send message
const sendMessage = async (req, res) => {
  try {

    const message = await Message.create(req.body);

    res.status(201).json({
      message: "Message sent successfully",
      data: message,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all messages
const getMessages = async (req, res) => {
  try {

    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json(messages);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete message
const deleteMessage = async (req, res) => {
  try {

    await Message.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Message deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  deleteMessage,
};