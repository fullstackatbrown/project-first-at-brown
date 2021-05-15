const express = require("express");
const router = express.Router();

const promptResponseController = require("../controllers/promptResponseController");
const auth = require("../middleware/auth");

// POST /prompt/:roomId
router.post("prompt/:roomId", auth, promptResponseController.createPromptResponse);

// PUT /prompt/:roomId
router.put("/prompt/:roomId", auth, promptResponseController.updatePromptResponse);

// DELETE /prompt/:roomId
router.delete("/prompt/:roomId", auth, promptResponseController.deletePromptResponse);

// POST /prompt/:roomId/report/:accountId
router.post("/prompt/:roomId/report/:accountId", auth, promptResponseController.reportPromptResponse);

module.exports = router;
