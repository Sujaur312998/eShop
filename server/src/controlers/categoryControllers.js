const CategoryModel=require('../models/categorySchma')
const slugify = require("slugify")


module.exports.all_categories__controller=(req,res,next)=>{
    const {name,parentId}=req.body

    console.log(typeof parentId)

    if(parentId==="0"){

        console.log("test")
        const newCat=new CategoryModel({
            name,
            parentId:"0",
            slug: slugify(name)
        })

        newCat.save()
        .then(result=>{
            return res.status(200).json({result})
        }).catch(err=>{
            console.log(err)
        })

    }
    else{
        CategoryModel.findOneAndUpdate({_id:parentId},{$set:{has_child: true}},{new: true}).then(result=>{
            
            const newCat=new CategoryModel({
                name,
                parentId,
                slug: slugify(name)
            })
    
            newCat.save()
            .then(result=>{
                return res.status(200).json({result})
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
        
    }


}

module.exports.get_all_categories__controller=(req,res,next)=>{
    const {catId}=req.params;

    CategoryModel.find().then(result=>{
        return res.status(200).json({result})
    }).catch(err=>{
        console.log(err)
    })
}
module.exports.sub_categories__controller=(req,res,next)=>{
    const {catId}=req.params;

    CategoryModel.find({parentId: catId}).then(result=>{
        return res.status(200).json({result})
    }).catch(err=>{
        console.log(err)
    })
}