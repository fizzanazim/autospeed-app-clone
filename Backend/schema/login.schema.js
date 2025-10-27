const { default: mongoose } = require("mongoose");

const LoginSchema = mongoose.Schema({

    firstname: {

        type: String

    },
        lastname: {

        type: String

    },
        username: {

        type: String

    },
        email:  {

        type: String

    },
        password:  {

        type: String

    },
    role:{

        type: String,
        enum: ["user", "admin"],
        default: "user"

    }

})

module.exports = mongoose.model('login', LoginSchema)