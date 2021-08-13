const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "E-SHOP USER", required: true
    },
    cartItems: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "PRODUCT", 
                required: true 
            },
            quantity:{
                type: Number, 
                default: 1, 
                required: true 
            },
            price: {
                type: Number,
                required:true
            },
            
        },
        
    ]



}, { timestamps: true })

module.exports = mongoose.model('CART', cartSchema)