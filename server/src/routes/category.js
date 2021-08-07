const express = require('express')
const router = express.Router()


const { addCategory, getCategory } = require('../controlers/admin/adminCategoryControler')
const { verifyUser, adminMiddleware } = require('../middlewar/commonMiddleware')


router.post('/category/create', verifyUser, adminMiddleware, addCategory)
router.get('/category/getCategory', getCategory)


module.exports = router