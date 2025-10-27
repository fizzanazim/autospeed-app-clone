const CategoriesSchema = require("../schema/Categories.schema")

const GetCategories = async(req,res)=>{

    let categories = await CategoriesSchema.find()
    res.send({categories:categories, message: 'success', success: true})

}

const AddCategory = async(req,res)=>{

    let catobj = req.body
    await CategoriesSchema.create(catobj)

    res.send({message: 'Object created', success:  true});

}

const EditCategory = async (req, res)=>{

    await CategoriesSchema.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            $set: req.body
        },
        {
            new: true
        }
    )

    res.send({message: 'successfully edited', success: true})
    
}

const DelCategory = async (req, res)=>{
    
    await CategoriesSchema.findOneAndDelete({_id:req.params.id})
    res.send({message: 'successfully deleted', success: true})

}

module.exports = {GetCategories, AddCategory, EditCategory, DelCategory}