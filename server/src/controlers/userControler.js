const User = require('../models/userSchma')


//User Registretion 
exports.signup = async (req, res) => {
    const { fullName, email,gender, contactNum, password } = req.body

    try {
        const userExist = await User.findOne({ email })
        if (userExist != null) {
            return res.status(422).json({ message: "User Already Exist!!!" })
        }
        const _user = new User({ fullName, email,gender, contactNum, password })
        await _user.save()
        return res.status(201).json({ message: "User Registretion Successfull!!!" })

    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

//User login

exports.signin = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "Something went wrong!!!"
            })
        } else {
            const user = await User.findOne({ email })

            if (user === null) {
                return res.status(400).json({ message: "User not exist!!!" })
            } else {
                const checkpass = await user.authenticate(password)
                if (checkpass) {
                    user.generateToken(user.fullName, user.email, user.role)
                    return res.status(200).json({ message: "Login Succesfull" })
                } else {
                    return res.status(400).json({ message: "wrong password" })
                }
            }
        }
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

