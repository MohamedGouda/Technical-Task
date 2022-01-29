const user = require('../models/user')
const checkController = require('./checkController')
const {sendWelcomeEmail} = require('../emails/accountCreationWelcomeMail')
const bcrypt = require('bcryptjs')

module.exports ={

    registerUser: async (req, res)=>{

        try{            
            const newUser =await  new user(req.body).save();
            sendWelcomeEmail(newUser.email , newUser.name)
            await newUser.generateAuthtoken()
            return res.send(newUser)
        }
        catch(error){
            res.status(400).send(error)
        }

    },

    login: async (req , res)=>{
        try{
            const loggedUser = await user.findByCredentioals( req.body.email , req.body.password)
            const token = await loggedUser.generateAuthtoken()

            res.send(`logged in successfuly .... ${token}`)

        }catch(error){
            res.status(500).send(error);
        }
    },

    logout: async (req , res)=>{
        try{
            req.user.tokens = req.user.tokens.filter((token)=>{
                return token.token !== req.token
            })

            await req.user.save()

            res.send("User Logged out Successflly....")
        } catch(error){
            res.status(500).send()
        }
    }

}