const express = require('express');
const { createAccountController, loginController } = require('../controllers/auth.controller');

const authRouter = express.Router();


authRouter.post("/registration", createAccountController)
authRouter.post("/login", loginController)

module.exports = authRouter;