const mongoose = require('mongoose');

const todoModel = new mongoose.Schema({
    list_id:{
        type: Number,
        required: true
    },
    title:{
        type:String,
        required: true
    },
    status:{
        type:Boolean,
        default:false
    },
    username:{
        type:String,
        required: true
    },
    isactive:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('todo',todoModel)