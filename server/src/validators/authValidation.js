const { check, validationResult } = require("express-validator")

exports.validationRequestSignup = [
    check("fullName")
        .notEmpty()
        .withMessage("Name is required!!!"),

    check("email")
        .isEmail()
        .withMessage( "Valid Email is required!!!"),

    check("contactNum")
        .notEmpty()
        .withMessage('Contact is required!!!'),

    check('password', 'The password must be 5+ chars long and contain a number')
        .not()
        .isIn(['123', 'password', 'god'])
        .withMessage('Do not use a common, word as the password & god')
        .isLength({ min: 5 })
        .matches(/\d/),

]
exports.isRequestValidated = (req, res, next) => {
    const error = validationResult(req)
    if (error.array().length > 0) {
        return res.status(400).json({
            error: error.array()[0].msg
        })
    }
    next()
}

exports.validationRequestSignin = [
    check("email")
        .isEmail()
        .withMessage( "Valid Email is required!!!"),

    check('password', 'The password must be 5+ chars long and contain a number')
        .not()
        .isIn(['123', 'password', 'god'])
        .withMessage('Do not use a common word as the password')
        .isLength({ min: 5 })
        .matches(/\d/),
]