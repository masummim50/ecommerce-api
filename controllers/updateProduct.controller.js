const ProductModel = require("../models/product");

module.exports.updateProductController = async(req, res, next)=> {
    // get the seller from req.user(because loginMiddleware should set that)
    // product id is sent in the parameter.
    // find the product and check if the seller of that product is this user,
    // then update the product
    try {
        const seller = req.user;
        const productId = req.params.id;
        const update = req.body;
        const product = await ProductModel.findById(productId);
        if(product.seller === seller.id){
            const updatedProduct = await ProductModel.findOneAndUpdate({_id:productId}, update);
            return res.status(200).json({
                status:'success',
                message:'product updated successfully',
                product:updatedProduct
            })
        }else{
            return res.status(500).json({
                status:'fail',
                message:'you do not have the permission to edit this product'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:'fail',
            error:error?.message
        })
    }
}