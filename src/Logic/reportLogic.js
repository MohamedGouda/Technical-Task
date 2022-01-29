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
    }

}