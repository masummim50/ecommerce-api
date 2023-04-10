const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  orders: {
    pending: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    delivered: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    canceled: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
  accountCreationDate: {
    type: Date,
    default: Date.now,
  },
});






const UserModel = new mongoose.model("User", userSchema);





module.exports = UserModel;
