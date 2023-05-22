const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name:({type:String, required:true}),
    type:({type:String, required:true}),
    price: ({type:Number, required:true})
},{
    versionKey:false
})

const productModel = mongoose.model("products",productSchema)

module.exports ={
    productModel
}