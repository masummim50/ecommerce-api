const { Schema, default: mongoose } = require("mongoose");

const reviewSchema = new Schema({
    reviewer:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    review: String,
    rating: Number,
    product: {
        type:mongoose.Types.ObjectId,
        ref:'Product'
    },

})

const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel;