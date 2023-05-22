const express = require("express")
const productRouter = express.Router()
const {productModel} = require("../models/product.model")
const {role} = require("../middlewares/role")
const {auth} = require("../middlewares/auth")





// -----------------------------------------PRODUCT Get ROUTE-------------------------------------------

productRouter.get("/products",auth, async(req,res)=>{
    const refreshToken = req.headers.authorization
    try {
        if(refreshToken){
            res.status(200).json({"msg":"Products accessed successfully"})
        }else{
            res.status(201).json({"msg":"Please Login First"})
        }
       
    } catch (error) {
        return res.status(501).json({"error":error.message})
    }
    
})


// -----------------------------------------PRODUCT Add ROUTE-------------------------------------------

productRouter.post("/addproducts",auth, role, (req,res)=>{
    res.status(200).json({"msg":"Products post route accessed successfully"})
})

// -----------------------------------------PRODUCT Delete ROUTE-------------------------------------------

productRouter.delete("/deleteproducts",auth, role, (req,res)=>{
    res.status(200).json({"msg":"Products delete route accessed successfully"})
})

module.exports = {
    productRouter
}