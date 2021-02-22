const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");
const auth = require("../middleware/auth");

// POST /account/login
router.post("/account/login", accountController.login);

// POST /account
router.post("/account", accountController.signup);

// GET /account/
router.get("/account", auth, accountController.getAccount);

// PUT /account
router.put("/account", auth, accountController.editAccount);

// GET /accounts
router.get("/accounts", auth, accountController.getAccounts);

module.exports = router;
