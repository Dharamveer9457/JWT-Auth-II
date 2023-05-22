const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:({type:String, required:true}),
    password:({type:String, required:true}),
    role : ({type:String, enum:["seller","buyer"]})
},{
    versionKey:false
})

const userModel = mongoose.model("users",userSchema)

module.exports ={
    userModel
}