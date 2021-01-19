const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");

// GET /chats
router.get("/", chatController.getChats);

// POST /chats/message
router.post("/message", chatController.sendChat);

// PUT /chats/message
router.put("/message", chatController.editMessage);

// DELETE /chats/message
router.delete("/message", chatController.deleteMessage);

module.exports = router;
