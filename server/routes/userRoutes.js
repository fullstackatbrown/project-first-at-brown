const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

// fill up routes here
router.post("/", userControllers.signup);

router.get("/:userId", userController.getUser);

module.exports = router;
