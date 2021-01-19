const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// POST /user/login
router.post("/user/login", userController.login);

// POST /user
router.post("/user", userController.signup);

// GET /user/:userId
router.get("/user/:userId", userController.getUser);

// PUT /user/:userId
router.put("/user/:userId", userController.editUser);

// GET /users
router.get("/users", userController.getUsers);

module.exports = router;
