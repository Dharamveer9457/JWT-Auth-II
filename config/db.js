const mongoose = require("mongoose")
require('dotenv').config()

const connection = mongoose.connect(process.env.mongoURL)
.then(()=>console.log("Connected to DB"))
.catch((err)=>console.log(err))

module.exports={
    connection
}