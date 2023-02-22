const mongoose = require('mongoose');
var jsv = require('json-validator');

const userModel = require('../models/user')

async function isUserExist(email){
    const data = await userModel.findOne({email:email})
    if(data){
        return true
    }else{
        return false
    }
}

async function paramValidation(data){
   
    if('name' in data && 'password' in data && 'email' in data){
        return true;
    }else{
        return false
    }
}
module.exports = {
    isUserExist,
    paramValidation
};