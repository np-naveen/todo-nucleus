const express = require('express')
const mongoose = require('mongoose');
const _ = require('lodash'); 
const cors = require('cors');

const userModel = require('./models/user')

const userController = require('./controller/user')
const authenticateUser = require('./controller/auth')
const addTodo = require('./controller/addTodo')
const authenticationToken = require('./controller/authenticateToken')
const updateTodo = require('./controller/updateTodo')
const deleteTodo = require('./controller/deleteTodo')
const getAllTodo = require('./controller/getAllTodo')
const verifyUser = require('./controller/verifyUser')

require('dotenv').config()

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTION_STRING, mongooseOptions,((err)=>{
    if(err){
        console.log(err,'DB connection issue');
    }else{
        console.log('Mongodb connected!!')
    }
}));

const db = mongoose.connection

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.post('/api/create-user',(async(req,res)=>{
    if(_.isEmpty(req.body)){
        res.status(400).send({success:false,message:"Invalid body"})
    }
    const bodyData = req.body && req.body;
    let validParams = await userController.paramValidation(bodyData);
    if(!validParams){
        res.status(400).send({success:false,message:'Invalid params'})
    }
    let userExist = await userController.isUserExist(bodyData.email);
    if(userExist){
        res.status(409).send({success:false,message:"User already exist"})
    }else{
        const insertedData = await userModel.create(bodyData);
        if(insertedData){
            res.status(200).send({success:true,message:"Created"})
        }else{
            res.status(501).send({success:false,message:"Unexpected error"})
        }
    }
}))

app.post('/api/login',authenticateUser)

app.post('/api/add-todo',authenticationToken,addTodo)

app.put('/api/update-todo/:id',authenticationToken,updateTodo)

app.delete('/api/delete-todo/:id',authenticationToken,deleteTodo)

app.get('/api/all-todo',authenticationToken,getAllTodo)

app.post('/api/verify-user',verifyUser)

app.listen(8000, () => {
    console.log(`Server started on PORT: 8000`)
});
