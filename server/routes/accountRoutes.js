const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');
const auth = require('../middleware/auth');

// POST /account/login
router.post('/account/login', accountController.login);

// POST /account
router.post('/account', accountController.signup);

// GET /account/:accountId
router.get('/account/:accountId', auth, accountController.get);

// PUT /account
router.put('/account', auth, accountController.update);

// GET /accounts
router.get('/accounts', auth, accountController.list);

module.exports = router;
