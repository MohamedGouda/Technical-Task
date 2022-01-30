const check = require('../models/check')
const cron = require('node-cron');
const reportLogic = require('../Logic/reportLogic')
const monitor = require('../siteMonitor/monitor');


module.exports ={

    createCheck: async (req, res)=>{
        try{            
            const newCheck =await  new check({...req.body , userId:req.user._id }).save();
            return res.send("check Saved in DB and running now ....")
        }
        catch(error){
            res.status(400).send(error)
        }
    },

    editCheck: async (req , res)=>{
        try{
            
            const foundCheck = await check.findOne({name: req.params.name})

            if(!foundCheck){
                 res.status(404).send("No checks Found....")
            }else if(req.user._id.toString() !== foundCheck.userId.toString()){
                 res.status(401).send('your are not authorized to run this check.....')
            }

            const updatedCheck = await check.updateOne({_id: foundCheck._id} , req.body ,{new:true , runValidators:true} )

             res.send("Check Updated....")
            
        }catch(error){
            res.status(400).send(error)
        }
    },

    deleteCheck : async (req, res)=>{
        try{
            const foundCheck = await check.findOne({name: req.params.name})

            
            if(!foundCheck){
                return res.status(404).send("No checks Found....")
            }else if(req.user._id.toString() !== foundCheck.userId.toString()){
                res.status(401).send('your are not authorized to delete this check.....')
            }else{
                await check.deleteOne({_id: foundCheck._id})         
                res.send("Check Deleted....")
            }

        }catch(error){
            res.status(400).send(error)
        }
    },

    runCheck : async (req , res)=>{
        try{
            returnedValue = await monitor(req,res)

            if(returnedValue == 0){
                res.status(404).send('No check Found.....')
            }else if(returnedValue == 1){
                res.status(401).send('your are not authorized to run this check.....')
            }else{

                if(req.body.run == 'true'){

                cron.schedule(`run ${req.parama.name}`,'* * * * *', function() {
                    axios({
                        method: 'post',
                        url:`http://localhost:3000/checks/Run/${req.parama.name}`,
                        Headers:{
                            "Authorization":`Bearer ${req.user.tokens[0].token}` 
                        }
                      }).then(()=>{
                            console.log("running......")
                      })
                      .catch((error)=>{
                          console.log("Error while running check .....")
                      })
                })
            }
            else{
                if(cron.scheduledJobs[`run ${req.parama.name}`]){
                    cron.scheduledJobs[`run ${req.parama.name}`].stop()
                }else{
                    
                }
            }

                res.send('check run successfully.....')
            }
        }
        catch(error){
            res.status(500).send(error)
        }
    },

    checkReport : async (req , res)=>{
        const currentCheck = await check.findOne({name: req.params.name})

        if(!currentCheck){
            return res.status(404).send('No Such Check Found.....')
        }else if(req.user._id.toString() !== currentCheck.userId.toString()){
            res.status(401).send('you are not authorized to genearte this report....')
        }else{
            res.send(reportLogic.generateReport(currentCheck.visits))
        }
    },
    
    checkReportByTag : async (req , res)=>{

        const userChecksListByTag = await check.find({tags: req.params.tag , userId: req.user._id})

        if(!userChecksListByTag){
            return res.status(404).send('No Such Check Found.....')
        }

        res.send(reportLogic.generateReportByTag(userChecksListByTag))

    }
}