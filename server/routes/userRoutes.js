const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// POST /user/login
router.post("/user/login", userController.login);

// POST /user
router.post("/user", userController.signup);

// GET /user/:userId
router.get("/user/:userId", auth, userController.getUser);

// PUT /user/:userId
router.put("/user/:userId", auth, userController.editUser);

// GET /users
router.get("/users", auth, userController.getUsers);

module.exports = router;
