const express = require('express');
const shopModel = require('../models/shop');
const ProductModel = require('../models/product');
// here lies all the public get routes

// get shops                    done
// get shop by id               done
// get product                  get product is a bit complicated
// get product by id            done
// get reviews of a product     done

const publicRouter = express.Router();

publicRouter.get("/shops", async(req, res, next)=> {
    try {
        const shops = await shopModel.find({}).populate('shopOwner','_id username');
    res.send(shops);
    } catch (error) {
        return res.status(500).json({
            status:'fail',
            error:error?.message
        })
    }
    
})

publicRouter.get("/shop/:id", async(req, res, next)=> {
    try {
        const shop = await shopModel.findById(req.params.id).populate('shopOwner', '-password')
        res.send(shop)
    } catch (error) {
        return res.status(500).json({
            status:'fail',
            error:error?.message
        })
    }
})

publicRouter.get("/product/:id", async(req, res, next)=> {
    try {
        const product = await ProductModel.findById(req.params.id).populate('shop').populate('seller', '-password').populate('buyers');
        res.send(product)
    } catch (error) {
        return res.status(500).json({
            status:'fail',
            error:error?.message
        })
    }
})

publicRouter.get("/product/review/:id", async(req, res, next)=> {
    // do it with the chaining, in case there aren't any reviews
    try {
        await ProductModel.findById(req.params.id).then(product=> {
            if(product.review.length === 0){
                return res.status(200).json([]);
            }else{
                product.populate('review');
                res.send(product);
            }
        })
    } catch (error) {
        return res.status(500).json({
            status:'fail',
            error:error?.message
        })
    }
})


module.exports = publicRouter;