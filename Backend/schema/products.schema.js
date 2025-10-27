const mongoose = require("mongoose");

const ProductsSchema =  mongoose.Schema({

    proname: { type: String},
    proimg: { type: String},
    proqty: { type: Number},
    prorating: { type: Number},
    proprice: { type: Number},
    category: {type: String}

})

module.exports = mongoose.model('products', ProductsSchema)