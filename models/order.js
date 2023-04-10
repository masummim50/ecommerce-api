
const { default: mongoose } = require("mongoose")
const {Schema} = mongoose;

const orderSchema = new Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ["pending", "delivered", "cancelled"],
        default: "pending"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: Number,
    totalCost: Number,
    address: String,
    paymentType: {
        type: String,
        enum: ["pre-payment", "cash on delivery"]
    }

})

const OrderModel = mongoose.model('Order', orderSchema)
module.exports = OrderModel;