const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");
const auth = require("../middleware/auth");

// GET /chats
router.get("/", auth, chatController.getChats);

// POST /chats/message
router.post("/message", auth, chatController.sendChat);

// PUT /chats/message
router.put("/message", auth, chatController.editMessage);

// DELETE /chats/message
router.delete("/message", auth, chatController.deleteMessage);

module.exports = router;
