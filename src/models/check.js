require('../db/mongoose')
const validator = require('validator');
const mongoose = require('mongoose')

const checkSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    url : {
        type: String,
        required: true
    },
    protocol:{
        type:String,
        required:true
    },
    path:{
        type:String
    },
    port:{
        type: Number
    },
    webhook:{
        type:String
    },
    timeout:{
        type:Number,
        default: 5000
    },
    interval:{
        type: Number,
        default:10
    },
    threshold:{
        type:Number,
        default:1
    },
    authentication:{
        type:{
            username:{
                type:String
            },
            password:{
                type:String
            }
        }
    },
    httpHeaders:{
        type:[]
    },
    assert:{
        type:Number
    },
    tags:{
        type:[]   
    },
    ignoreSSL:{
        type: Number
    },
    visits:{
        type: []
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }

})

const Check = mongoose.model('Check' , checkSchema)

module.exports = Check