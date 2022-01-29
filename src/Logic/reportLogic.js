const report = require('../models/report')

module.exports = {

    generateReport: (visits)=>{

        let averageResponseTime = 0 
        let total_uptime =0 
        let total_downtime = 0

        visits.forEach(visit => {
            averageResponseTime += visit.responseDuration 
            total_uptime += (visit.successful == true) ? 1 : 0 
            total_downtime += (visit.successful == false) ? 1 : 0 
        });

        averageResponseTime /= visits.length

        return {
            averageResponseTime,
            total_uptime,
            total_downtime
        }
    },

    generateReportByTag: (checksListByTag)=>{

        let averageResponseTime = 0 
        let total_uptime =0 
        let total_downtime = 0
        let totalAverageResposneTime = 0 ;
        checksListByTag.forEach(check=>{
            check.visits.forEach(visit => {
                averageResponseTime += visit.responseDuration 
                total_uptime += (visit.successful == true) ? 1 : 0 
                total_downtime += (visit.successful == false) ? 1 : 0 
            });

            totalAverageResposneTime+= averageResponseTime/check.visits.length ; 
            averageResponseTime=0;
        })

        return {
            averageResponseTime: totalAverageResposneTime|| 0 ,
            total_uptime,
            total_downtime
        }
    }
}