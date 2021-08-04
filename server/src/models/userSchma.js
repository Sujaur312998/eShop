const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = process.env.SECRECT_KEY

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    contactNum: {
        type: String,
        required: true,
        trim: true,
        minLength: 11,
        maxLength: 14
    },
    hash_password: {
        type: String,
        required: true,
        trim: true,
    },
    gender:{
        type: String,
        required: true,
        enum:["None of them","male","female"],
    },
    role: {
        type: String,
        enum: ["user", "Admin"],
        default: "user"
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            },
            user: {
                name: {
                    type: String
                },
                email: {
                    type: String
                },
                role: {
                    type: String
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        }
    ]
}, {
    timestamps: true
})

userSchema.virtual("password")
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 12)
    })


userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hash_password)
    },
    generateToken: async function (fullName, email, role) {
        //console.log(fullName, email, role)
        const token = jwt.sign({ _id: this._id }, key, { expiresIn: "1h" })

        this.tokens = this.tokens.concat({
            token: token,
            user: {
                name: fullName,
                email: email,
                role: role
            }
        })
        //console.log(this.tokens);
        await this.save()
        return this.tokens
    }
}


module.exports = mongoose.model("E-SHOP USER", userSchema)
