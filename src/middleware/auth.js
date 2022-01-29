const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth= async (req , res , next)=>{
    try{
        const token = req.headers["authorization"].replace('Bearer ' ,'')

        const decodedData = jwt.verify(token , 'Bosta-task')
        
        const user = await User.findOne({_id: decodedData._id , 'tokens.token':token})

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user 
        
        next()

    }catch(error){
        res.status(401).send({error:"authentication fiald"})
    }


}


module.exports= auth