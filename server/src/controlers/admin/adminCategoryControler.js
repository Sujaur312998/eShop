const Category = require('../../models/categorySchma')
const slugify = require("slugify")


const createCategory = (categories, parentId = null) => {
    const categoryList = []
    let category;
    if (parentId === null) {
        category = categories.filter(cat => cat.parentId === undefined)
    } else {
        category = categories.filter(cat => cat.parentId === parentId)
    }

    //console.log(category);

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategory(categories, cate.id)
        })
    }
    return categoryList

}



exports.addCategory = (req, res) => {
    const cateforyObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if (req.file) {
        cateforyObj.categoryImage = process.env.CATEGORYIMG + '/public/' + req.file.filename
    }
    //console.log(cateforyObj);
    if (req.body.parentId) {
        cateforyObj.parentId = req.body.parentId
    }

    const cat = new Category(cateforyObj)
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error })
        if (category) {
            return res.status(201).json({ category })
        }
    })
}


exports.getCategory = (req, res) => {
    Category.find({})
        .exec((error, category) => {
            if (error) return res.status(400).json({ error })
            if (category) {

                const categoryList = createCategory(category)

                return res.status(200).json({ categoryList })
            }
        })
}
