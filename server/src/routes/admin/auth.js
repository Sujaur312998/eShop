const express = require('express')
const router = express.Router()
//const {verifyUser}=require("../../middlewar/commonMiddleware")
const { signup, signin} = require('../../controlers/admin/userControler')
const {
    validationRequestSignup,
    isRequestValidated,
    validationRequestSignin,
} = require('../../validators/authValidation')



router.post('/admin/signin', validationRequestSignin, isRequestValidated, signin)

router.post('/admin/signup', validationRequestSignup, isRequestValidated, signup)



module.exports = router