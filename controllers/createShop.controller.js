const { ObjectId } = require("mongodb");
const SellerModel = require("../models/seller");
const shopModel = require("../models/shop");
const { default: mongoose } = require("mongoose");

const createShopController = async (req, res, next)=> {
    

    try {
        let user = req.user;
        user = await SellerModel.findById(user.id);
        if(user.shop){
            return res.json({
                message:'you already have a shop'
            })
        }
        const data = req.body;
        const createdShop = await shopModel.create(req.body);
        const update = await SellerModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(user.id)}, {shop:mongoose.Types.ObjectId(createdShop._id)});
        return res.json({
            status:'shop created successfully',
        })
    } catch (error) {
        return res.status(500).json({
                    status:'fail',
                    message:error?.message
                })
    }



}

module.exports = createShopController