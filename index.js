const express = require("express")
const app = express()
app.use(express.json())
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.route")
const {productRouter} = require("./routes/product.route")

let abc = 1
app.use("/users",userRouter)
app.use("/products", productRouter)


app.listen(4500,async()=>{
    try {
        await connection
        console.log("Server running at 4500")
    } catch (error) {
        console.log(error)
    }
})




