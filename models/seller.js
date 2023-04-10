const { default: mongoose } = require("mongoose")
const { Schema } = mongoose;

const sellerSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type:String,
    enum: ['seller'],
    required:true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  shop:{
    type: Schema.Types.ObjectId,
    ref:'Shop'
  },
  orders: {
    pending: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }],
    delivered: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }],
    canceled: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }]
  },
  accountCreationDate: {
    type: Date,
    default: Date.now
  }
});

const SellerModel = mongoose.model('Seller', sellerSchema);

module.exports = SellerModel;
