const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");
const auth = require("../middleware/auth");

// POST /message
router.post("/message", auth, messageController.post);

module.exports = router;
