const jwt = require('jsonwebtoken')
const {Jwt_secret} = require("../keys")
const mongoose = require("mongoose")
const USER = mongoose.model("USER")

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must have logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,Jwt_secret,async (err, payload)=>{
        if(err){
            return res.status(401).json({error:"You must have logged in"})
        }
        const {_id} = payload
        const userData = await USER.findById(_id)
        req.user = userData
        next();
    })
}