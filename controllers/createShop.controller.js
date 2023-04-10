const { ObjectId } = require("mongodb");
const SellerModel = require("../models/seller");
const shopModel = require("../models/shop");

const createShopController = async (req, res, next)=> {
    
    try {
        // check if all credentials have been sent
        const data = req.body;
        const {shopName, shopOwner} = data;
        if(!shopName || !shopOwner){
            return res.status(400).json({
                status:'fail',
                message:'provide all information'
            })
        }
        // check if the seller already has a store, can't create more than one store
        const seller = await SellerModel.findOne({_id:new ObjectId(shopOwner)});
        if(!seller){
            return res.status(400).json({
                status:'fail',
                message:'no seller found'
            })
        }
        if(seller.shop){
            return res.status(400).json({
                status:'fail',
                message:'You already have a store'
            })
        }
        // create the shop model and update the seller account
        const createdShop = await shopModel.create(data);
        await SellerModel.findOneAndUpdate({_id:new ObjectId(shopOwner)}, {shop:createdShop._id})
        return res.status(200).json({
            status:'success',
            message:'store created successfully'
        })
    } catch (error) {
        return res.status(500).json({
            status:'fail',
            message:error?.message
        })
    }


}

module.exports = createShopController