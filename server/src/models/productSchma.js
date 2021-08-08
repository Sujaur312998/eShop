const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: "CATEGORY"
    },
    offer: { type: Number },
    productPicture: [
        { img: { type: String } }
    ],
    review: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "E-SHOP USER" },
            review: String
        }
    ], createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "E-SHOP USER"
    }

})


module.exports = mongoose.model('PRODUCT', productSchema)