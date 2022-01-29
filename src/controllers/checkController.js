const check = require('../models/check')
const reportLogic = require('../Logic/reportLogic')
const monitor = require('../siteMonitor/monitor');


module.exports ={

    createCheck: async (req, res)=>{

        try{            
            const newCheck =await  new check(req.body).save();
            return res.send("check Saved in DB and running now ....")
        }
        catch(error){
            res.status(400).send(error)
        }
    },

    editCheck: async (req , res)=>{
        try{
            
            const updatedCheck = await check.findOneAndUpdate({name: req.params.name} , req.body , {new: true , runValidators:true})            
            
            await updatedCheck.save()

            
    
            if(!updatedCheck){
                return res.status(404).send("No check Found....")
            }

            res.send("Check Updated....")

        }catch(error){
            res.status(400).send(error)
        }
    },

    deleteCheck : async (req, res)=>{
        try{
            const deletedCheck= await check.findOneAndDelete({ name: req.params.name})
           
            if(!deletedCheck){
                return res.status(400).send('there is no check found...')
            }

            res.send('check deleted....')
        }catch(error){
            res.status(400).send(error)
        }
    },

    runCheck : async (req , res)=>{

        try{
            await monitor(req,res)
            res.send('check run successfully.....')

        }
        catch(error){
            res.status(500).send(error)
        }
    },

    checkReport : async (req , res)=>{

        const currentCheck = await check.findOne({name: req.params.name})

        if(!currentCheck){
            return res.status(404).send('No Such Check Found.....')
        }
        

        res.send(reportLogic.generateReport(currentCheck.visits))
    },

    checkReportByTag : async (req , res)=>{

    }
}