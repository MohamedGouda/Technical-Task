const report = require('../models/report')

module.exports = {

    generateReport: (visits)=>{

        let averageResponseTime = 0 
        let total_uptime =0 
        let total_downtime = 0
        let history=[]
        let outages=0 
        let availability=0 
        
        visits.forEach(visit => {
            averageResponseTime += visit.responseDuration 
            total_uptime += (visit.successful == true) ? 1 : 0 
            total_downtime += (visit.successful == false) ? 1 : 0 
            history.push(visit.timestamp)
            availability +=  (visit.successful == true) ? 1 : 0
            outages += (visit.successful == false) ? 1 : 0
        });

        averageResponseTime /= visits.length
        
        Status= visits[visits.length-1].successful == true ? 'Up' : 'Down' 
       

        availability = availability ? (availability / visits.length) *100 : 0 

        return {
            Status, 
            availability,
            outages,
            total_downtime,
            total_uptime,
            averageResponseTime,
            history 
        }
    },

    generateReportByTag: (checksListByTag)=>{

        let averageResponseTime = 0 
        let total_uptime =0 
        let total_downtime = 0
        let history=[]
        let totalAverageResposneTime = 0 
        let Status =''
        let availability=0 
        let totalVisits=0 
        let outages = 0 

        checksListByTag.forEach(check=>{
            
            check.visits.forEach(visit => {
                totalVisits ++
                averageResponseTime += visit.responseDuration 
                total_uptime += (visit.successful == true) ? 1 : 0 
                total_downtime += (visit.successful == false) ? 1 : 0 
                history.push(visit.timestamp)
                availability +=  (visit.successful == true) ? 1 : 0
                outages += (visit.successful == false) ? 1 : 0 
            });

            totalAverageResposneTime+= averageResponseTime/check.visits.length ; 
            averageResponseTime=0;
        })

        Status= checksListByTag[checksListByTag.length-1].visits[visits.length-1].successful == true ? 'Up' : 'Down' || 'unknown'
        
        availability = availability ? (availability / totalVisits) *100 : 0 

        return {
            Status, 
            availability,
            outages,
            total_downtime,
            total_uptime,
            averageResponseTime: totalAverageResposneTime|| 0 ,
            history
        }
    }
}