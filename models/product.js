const { default: mongoose } = require("mongoose")
const {Schema} = mongoose;


const productSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true,
    },
    price: {
        type:Number,
        required:true,
    },
    inStock: {
        type:Number,
        required:true,
    },
    stockStatus:{
        type:String,
        enum:['in-stock', 'out-of-stock']
    },
    images:{
        type:[String],
        required:true,
        maxlength:5
    },
    sold: {
        type:Number,
        default: 0
    },
    buyers:[{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }],
    review: [{
        type: mongoose.Types.ObjectId,
        ref:'Review'
    }],
    seller: {
        type:mongoose.Types.ObjectId,
        ref:'Seller',
        required:true
    },
    shop:{
        type:mongoose.Types.ObjectId,
        ref:'Shop',
        required:true
    },
    rating: Number
})

const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;