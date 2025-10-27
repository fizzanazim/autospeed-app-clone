const loginSchema = require("../schema/login.schema")
const jwt = require("jsonwebtoken")

const isLoggedIn = async(req, res, next)=>{

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.send({message: 'please login first!', success: false});
    }
    let token = authHeader.split(" ")[1];

    if(!token){

        return res.send({message: 'please login first!', success: false})

    }

    let user_verify = jwt.verify(token, process.env.SECRET_KEY)
    console.log(user_verify);

    let user = await loginSchema.findOne({email: user_verify.email})
    if(!user){

        return res.send({message: 'unauthorized user', success: false})

    }

    req.user = user

    next()   


}

module.exports = {isLoggedIn}