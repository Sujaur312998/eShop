const express = require('express')
const router = express.Router()
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

const { addCategory, getCategory } = require('../controlers/admin/adminCategoryControler')
const { verifyUser, adminMiddleware } = require('../middlewar/commonMiddleware')
const {all_categories__controller,sub_categories__controller,get_all_categories__controller}=require('../controlers/categoryControllers')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage })



router.post('/category/create', verifyUser, adminMiddleware, upload.single('categoryImg'), addCategory)
router.get('/category/getCategory', getCategory)


router.post('/all_categories',all_categories__controller)
router.get('/all_categories',get_all_categories__controller)
router.get('/all_categories/:catId',sub_categories__controller)


module.exports = router