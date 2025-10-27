const { default: mongoose } = require("mongoose");

const CategorySchema = mongoose.Schema({

    catname: {type: String},
    catimg: {type: String}

})

module.exports = mongoose.model('categories', CategorySchema)