
const { default: mongoose } = require("mongoose")
const {Schema} = mongoose;

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }]

}, {timestamps: true})

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;