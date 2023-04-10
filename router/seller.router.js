const express = require('express');
const createShopController = require('../controllers/createShop.controller');
const addProductController = require('../controllers/addProduct.controller');
const { checkLoginMiddleware } = require('../middlewares/checkLoginMiddleware');
const { updateProductController } = require('../controllers/updateProduct.controller');

const sellerRouter = express.Router();

sellerRouter.post("/createShop",checkLoginMiddleware, createShopController)
sellerRouter.post("/addProduct", checkLoginMiddleware, addProductController)
sellerRouter.patch("/updateProduct/:id", checkLoginMiddleware, updateProductController)

module.exports = sellerRouter;
