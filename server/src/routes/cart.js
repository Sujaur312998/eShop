const express = require('express')
const router = express.Router()


const { addtoCart } = require('../controlers/Carts')
const { verifyUser, userMiddleware } = require('../middlewar/commonMiddleware')


router.post('/user/cart/addtoCart', verifyUser, userMiddleware, addtoCart)




module.exports = router