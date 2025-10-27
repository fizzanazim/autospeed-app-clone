const isAdmin = async(req, res, next)=>{

    if(req.user.role != 'admin'){

        return res.send({message: 'inaccessible data', success: false})

    }
    
    next()

}

module.exports = {isAdmin}