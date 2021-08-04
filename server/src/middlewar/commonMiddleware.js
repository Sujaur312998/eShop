const jwt = require('jsonwebtoken')


exports.verifyUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.SECRECT_KEY)
        req.user = user
        next()
    } catch (e) {
        console.log(e)
    }

}