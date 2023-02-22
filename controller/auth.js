const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

async function generateToken(data){
    const token = jwt.sign({name:data.name,email:data.email},process.env.ACCESS_TOKEN,{expiresIn:"24h"})
    return token;
}

async function authenticateUser(req,res){
    const email = req.body.username;
    const password =  req.body.password;
    const userData = await userModel.findOne({email:email})
    if(userData){
        if(password == userData.password){
            const token = await generateToken(userData);
            res.status(200).send({success:true,message:"User Authenticate",token:token})
        }else{
            res.status(401).send({success:false,message:"Invalid password"})
        }
    }else{
        res.status(403).send({success:false,message:"please sign up"})
    }
}

module.exports = authenticateUser;