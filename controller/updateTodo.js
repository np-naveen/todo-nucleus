const todoModel = require("../models/todo");

async function updateTodo(req,res){
    if(req.user.email != req.body.username){ return res.status(401).send({success:false,message:"Invalid user"})}
    const filter = {list_id:req.params.id}
    const updateDoc = req.body.newvalues
    try{
        const updatedValue = await todoModel.updateOne(filter, updateDoc)
        if(updatedValue.matchedCount == 0){
            return res.status(500).send({success:false,message:"Invalid id"})
        }else{
            return res.status(200).send({success:true,message:"new value updated"})
        }
    }catch(err){
        return res.status(500).send({success:false,message:"Unexpected error"})
    }
}

module.exports = updateTodo;