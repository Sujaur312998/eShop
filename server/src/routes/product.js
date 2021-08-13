const express = require('express')
const router = express.Router()
const multer = require('multer')
const shortid = require('shortid')
const path= require('path')


const { addProduct } = require('../controlers/admin/adminProductControler')
const { verifyUser, adminMiddleware } = require('../middlewar/commonMiddleware')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname),'uploads') )
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage })


//Routers
router.post('/product/create', verifyUser, adminMiddleware,upload.array('productPicture'), addProduct)


module.exports = router