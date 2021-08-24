const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

// GET /chats
router.get('/chats', auth, chatController.getChats);

// GET /chat
router.get('/chat', auth, chatController.getChat);

module.exports = router;
