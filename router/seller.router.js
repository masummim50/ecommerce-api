const express = require('express');
const createShopController = require('../controllers/createShop.controller');

const sellerRouter = express.Router();

sellerRouter.post("/createShop", createShopController)

module.exports = sellerRouter;
