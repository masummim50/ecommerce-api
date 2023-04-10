const { default: mongoose } = require("mongoose");
const ProductModel = require("../models/product");
const SellerModel = require("../models/seller");
const shopModel = require("../models/shop");

const addProductController = async (req, res, next) => {
  try {
    let user = req.user;
    user = await SellerModel.findById(user.id);
    if (!user.shop) {
      return res.json({
        message: "create a shop to upload product",
      });
    }
    const data = req.body;
    const product = await ProductModel.create({
      ...data,
      seller: mongoose.Types.ObjectId(user._id),
      shop: mongoose.Types.ObjectId(user.shop),
    });
    const update = await shopModel.findOneAndUpdate(
      { shopOwner: user.id },
      { $push: { products: mongoose.Types.ObjectId(product._id) } },
      { new: true }
    );
    return res.json({
      status: "product added successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error?.message,
    });
  }
};

module.exports = addProductController;
