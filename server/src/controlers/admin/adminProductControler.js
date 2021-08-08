const Product = require('../../models/productSchma')
const slugify = require('slugify')


exports.addProduct = (req, res) => {

    const {
        name, price, description, category, quantity,review
    } = req.body

    try {
        let productPictures = []

        if (req.files.length > 0) {
            productPictures = req.files.map(file => {
                return { img: file.filename }
            })
        }

        //console.log(productPictures)

        const product = new Product({
            name,
            slug: slugify(name),
            price,
            quantity,
            productPicture:productPictures,
            description,
            category,
            createdBy:req.user._id,
            review,
        })

        product.save((error, product) => {
            if (error) return res.status(500).json({ error })
            if (product) return res.status(201).json({ product })
        })

    } catch (e) {
        console.log(e);
    }





    //res.status(200).json({ file: req.files, body: req.body })
}