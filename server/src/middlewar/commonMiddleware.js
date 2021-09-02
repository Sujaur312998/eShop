const jwt = require('jsonwebtoken')
const UserSchema = require('../models/userSchma')

exports.verifyUser = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.SECRECT_KEY)
            if(user){
                req.user = user
                return res.status(200).json({ message: "Authorization Successfull" })
            }

        } else {
            return res.status(500).json({ message: "Authorization required" })
        }
        next()
    } catch (e) {
        return res.status(500).json(e)
    }
}

exports.userMiddleware = (req, res, next) => {
    if(req.user.role !== "user"){
        return res.status(400).json({message: "User access denied"})
    }
    next()
}

exports.adminMiddleware = (req, res, next) => {
    if(req.user.role !== "Admin"){
        return res.status(400).json({message: "Admin access denied"})
    }
    next()

}