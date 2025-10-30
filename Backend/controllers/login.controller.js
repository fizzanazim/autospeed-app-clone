const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginSchema = require('../schema/login.schema')
const dotenv = require('dotenv')

dotenv.config({path: './.env'})


const PostUSerLoginInfo = async (req, res) => {

    let obj = req.body

    let temp = await loginSchema.findOne({

        $or: [{ username: obj.usernameemail }, { email: obj.email }]
        // username:info.username //and condition
    })
    console.log(temp);


    if (temp) {

        res.send({ message: 'user already existing', success: false })

    }
    else {

        var hashedPassword = await bcrypt.hash(obj.password, 10)
        obj.password = hashedPassword
        //efn3i3ir9499r39ej239ej2dn3344 creates such kind of password

        let newuser = await loginSchema.create(obj)
        console.log(newuser);

        res.send({ message: 'successful', success: true })

    }

}


const verifyUserLogin = async (request, response) => {

    let info = request.body

    let temp = await loginSchema.findOne({

        $or: [{ username: info.usernameemail }, { email: info.usernameemail }]

    })

    if (temp) {

        // if(temp.password == info.password){
        if (await bcrypt.compare(info.password, temp.password)) {

            const token = jwt.sign({ email: temp.email }, process.env.SECRET_KEY, { expiresIn: '7d' })
            response.send({ message: 'login successfully', success: true, token: token, user_found: temp })

        }
        else {

            response.send({ message: 'incorrect password', success: false })

        }

    }
    else {

        response.send({ message: 'user not found', success: false })

    }

}

const AllUsersData = async (req, res) => {

    const users = await loginSchema.find()
    res.send({ message: 'All Users Data', users, success: true })

}

module.exports = {
    PostUSerLoginInfo, verifyUserLogin, AllUsersData

}
