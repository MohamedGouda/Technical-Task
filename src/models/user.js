require('../db/mongoose')
const validator = require('validator');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number');
            }
        }
    },
    email:{
        type: String,
        required: true,
        trim:true,
        lowercase: true,
        unique:true,
        validate(value){
            if(! validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Password can not contain the string password")
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

userSchema.pre('save', async function(next){
    try{
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, 8)
        }
        next();
    }catch(error){
        throw new Error('Error before saving.... ')
    }
})

userSchema.statics.findByCredentioals = async (email , password)=>{
    const currentUser = await User.findOne({email})

    if(!currentUser){
        throw new Error('User Not Register......')
    }

    let passwordMatch = await bcrypt.compare(password , currentUser.password)

    if(!passwordMatch){
        throw new Error('Email or Password is wrong.....')
    }

    return currentUser
}

userSchema.methods.generateAuthtoken = async function(){
    const token = jwt.sign({"_id":this._id.toString()} , 'Bosta-task')

    this.tokens = this.tokens.concat({token})
    
    await this.save()

    return this.tokens
}

const User = mongoose.model('User' , userSchema)

module.exports = User