const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    categoryImage: { type: String },
    parentId: {
        type: String,
    },
    has_child:{
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model("CATEGORY", categorySchema)
