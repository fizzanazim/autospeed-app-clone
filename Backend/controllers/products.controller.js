const ProductsSchema = require("../schema/products.schema")

const FindSingleProduct = async(req, res) => {
    
    let id = req.params.id
    let findoneobject = await ProductsSchema.findOne({_id:id})
    console.log(findoneobject);
    res.send(findoneobject)

}

const AddNewProduct =  async (req, res) => {

    let proobj = req.body
    await ProductsSchema.create(proobj)

    res.send({message: 'Product Obj created', success: true});
}

const GetAllProducts =  async (req, res) => {

    let products = await ProductsSchema.find()
    res.send({products: products, message: 'success', success: true})

}

const DeleteProduct = async(req, res)=>{

    await ProductsSchema.findOneAndDelete({_id:req.params.id})
    res.send({message: 'deleted', success: true})

}

const UpdateProduct = async(req, res)=>{

    let obj = req.body
    let editid = req.params.updateid

    await ProductsSchema.findOneAndUpdate(
        {
            _id:editid
        },
        {
            $set: obj
        },
        {
            new:true
        }
    )

    res.send({message: 'product updated', success: true})

}

module.exports = {FindSingleProduct, AddNewProduct, GetAllProducts, DeleteProduct, UpdateProduct}