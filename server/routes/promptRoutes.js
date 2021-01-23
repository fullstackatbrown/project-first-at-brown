const express = require("express");
const router = express.Router();

const promptController = require("../controllers/promptController");
const auth = require("../middleware/auth");

// GET /prompt/:promptId
router.get("/prompt/:promptId", auth, promptController.getPrompt);

// POST /prompt
router.post("prompt", auth, promptController.postPrompt);

// PUT /prompt/:promptId
router.put("/prompt/:promptId", auth, promptController.editPrompt);

// DELETE /prompt/:promptId
router.delete("/prompt/:promptId", auth, promptController.deletePrompt);

// GET /prompts
router.get("/prompts", auth, promptController.getPrompts);

// GET /prompt/:promptId/report
router.get("/prompt/:promptId/report", auth, promptController.getReportPrompt);

// POST /prompt/:promptId/report
router.post("/prompt/:promptId/report", auth, promptController.reportPrompt);

module.exports = router;
