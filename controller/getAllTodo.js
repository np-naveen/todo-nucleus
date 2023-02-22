const todoModel = require("../models/todo");

async function getAllTodo(req,res){
    if(req.user.email != req.body.username){ return res.status(401).send({success:false,message:"Invalid user"})}
    const filter = {username:req.body.username,isactive:true}
    const data = await todoModel.find(filter)
    return res.status(200).send({success:true,data:data})
}

module.exports = getAllTodo;