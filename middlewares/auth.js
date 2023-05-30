const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req,res,next)=>{
    const token12 = req.headers.authorization

    if(!token){
        res.status(500).json({"error":"Unauthorized"})
    }

    try {
       const decoded = jwt.verify(token, process.env.jwtSecret)
       req.user = decoded.user;
       next() 
    } catch (error) {
        res.status(500).json({"error":error.message})
    }
}

module.exports = {
    auth
}