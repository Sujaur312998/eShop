const Cart = require('../models/cartSchema')

exports.addtoCart = async (req, res) => {
    try {
        const product = req.body.cartItems.product
        const findUser = await Cart.findOne({ user: req.user._id })

        if (findUser === null) {
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            })
            const createCart = await cart.save()
            return res.status(201).json({ createCart })
        } else {

            const addNewProducttoCart = await Cart.findOne({ "cartItems.product": product })
            const item = findUser.cartItems.find(c => c.product == product)

            if (addNewProducttoCart === null || item === undefined && findUser) {
                const updateCart = await Cart.findOneAndUpdate({ user: req.user._id }, {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }, { new: true })
                return res.status(201).json({ updateCart })
            } else {
                const item = findUser.cartItems.find(c => c.product == product)

                const updateCart = await Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product": product }, {
                    "$set": {
                        "cartItems.$.quantity": item.quantity + req.body.cartItems.quantity
                    }
                }, { new: true })
                return res.status(201).json({ updateCart })
            }
        }

    } catch (error) {
        console.log(error)
    }
}