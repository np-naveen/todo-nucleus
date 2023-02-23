const todoModel = require('../models/todo')

async function todoparamValidation(data){
    if('title' in data && 'username' in data){
        return true
    }else{
        return false
    }
}

async function addTodo(req,res){
    let bodyData = req.body;
    if(bodyData.username != req.user.email){ return res.status(401).send({success:false,message:"Invalid user"})}
    const isVaild = await todoparamValidation(bodyData);
    if(isVaild){
        const count = await todoModel.count()
        bodyData = {
            ...bodyData,
            list_id:count
        }
        try{
            const insertedData = todoModel.create(bodyData);
            if(insertedData){
                return res.status(200).send({success:true,message:"todo added"})
            }else{
                return res.status(500).send({success:false,message:"Unexpected error"})
            }
        }catch(err){
            return res.status(500).send({success:false,message:"Unexpected error"})
        }
        
    }else{
        return res.status(400).send({success:false,message:"Invalid params"})
    }
}

module.exports = addTodo;