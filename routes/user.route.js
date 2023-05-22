const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const express = require("express")
const userRouter = express.Router()
const {userModel} = require("../models/user.model")
const {auth} = require("../middlewares/auth")
require('dotenv').config()

// -----------------------------------------SIGNUP ROUTE-------------------------------------------
userRouter.post("/signup", async(req,res)=>{
    const {email,password,role} = req.body

    try {
        let user = await userModel.findOne({email})

        if(user){
            res.status(400).json({"msg":"User already exist"})
        }

        const hashedpwd = await bcrypt.hash(password,10) 
        user  = new userModel({email, password:hashedpwd, role})
        await user.save()

       return res.status(200).send({"msg":"New user registered"})

    } catch (error) {
       return res.status(501).json({"error":error.message})
    }
})

// -----------------------------------------LOGIN ROUTE-------------------------------------------
userRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body
    
    try {
        const user = await userModel.findOne({email})

        if(!user){
           return res.status(501).json({"msg":"Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(501).json({"msg":"Password didn't match"})
        }

        const token = jwt.sign({ user: {id:user.id, role:user.role}}, process.env.jwtSecret , { expiresIn: process.env.jwtExpiration });

        const refreshToken =  jwt.sign({ user: {id:user.id, role:user.role}}, process.env.jwtSecret , { expiresIn: process.env.refreshTokenExpiration });

        return res.status(200).json({"msg":"User Logged in Successfully", "token":token, "refreshToken":refreshToken})

    } catch (error) {
        return res.status(501).json({"error":error.message})
    }
})



// -----------------------------------------LOGout ROUTE-------------------------------------------

let blacklisted = []

userRouter.post("/logout",auth, async(req,res)=>{
    const refreshToken = req.headers.authorization
    try {
        if(refreshToken){
            blacklisted.push(refreshToken)
            return res.status(200).json({"msg":"Logged Out Successfully"})
        }else{
            return res.status(201).json({"error":"token not found"})
        }
    } catch (error) {
        return res.status(501).json({"error":error.message})
    }
})


module.exports = {
    userRouter,
    
}





