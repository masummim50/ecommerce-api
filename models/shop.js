const { Schema, default: mongoose } = require("mongoose");

const shopSchema = new Schema({
    shopName: {
        type:String,
        required:true,
        unique:[true, 'shopname must be unique']
    },
    shopOwner:{
        type: mongoose.Types.ObjectId,
        ref: 'Seller',
    },
    products: [
        {
            type:mongoose.Types.ObjectId,
            ref:'Product'
        }
    ],
    shopFollowers: [
        {
            type:mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    shopVouchers:[
        {
            name:{
                type:String
            },
            discount:{
                type:Number,
                min:[1,'too little discount'],
                max:100
            }
        }
    ]

})

const shopModel = mongoose.model('Shop', shopSchema);
module.exports = shopModel;