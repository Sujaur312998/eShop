const express = require('express')
const router = express.Router()
const {verifyUser}=require("../middlewar/commonMiddleware")
const { signup, signin} = require('../controlers/userControler')
const {
    validationRequestSignup,
    isRequestValidated,
    validationRequestSignin,
} = require('../validators/authValidation')



router.post('/signin', validationRequestSignin, isRequestValidated, signin)

router.post('/signup', validationRequestSignup, isRequestValidated, signup)

router.post('/profile', verifyUser, (req, res) => {
    res.status(200).json({ message: 'profile' })
})


module.exports = router