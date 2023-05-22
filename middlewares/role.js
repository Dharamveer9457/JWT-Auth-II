const {userModel} = require("../models/user.model")

const role = (req,res,next)=>{
        if(req.user.role !== "seller"){
            res.status(500).json({"error":"You are not authorized to do so"})
        }else{
            next()     
}
}
module.exports = {
    role
}