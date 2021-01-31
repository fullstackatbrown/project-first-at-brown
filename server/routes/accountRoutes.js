const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");
const auth = require("../middleware/auth");

// POST /account/login
router.post("/account/login", accountController.login);

// POST /account
router.post("/account", accountController.signup);

// GET /account/:accountId
router.get("/account/:accountId", auth, accountController.getAccount);

// PUT /account/:accountId
router.put("/account/:accountId", auth, accountController.editAccount);

// GET /accounts
router.get("/accounts", auth, accountController.getAccounts);

module.exports = router;
