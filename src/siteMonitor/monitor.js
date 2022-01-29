const axios = require("axios");
const res = require("express/lib/response");
const Check = require('../models/check')
const mail = require('../emails/checkURLStatusMail')

const sendNotificationTowebhook= (url , status)=>{
    axios({
        method: 'post',
        url: url,
        data: {
            Message: `${url} is currently ${status}`
        }
      }).then(()=>{
          console.log("Notification Send to Webhook")
      })
      .catch((error)=>{
          console.log("Error while sending Notification to webhook")
      })
}

const monitor = async (req, response) => {

    const currentCheck = await Check.findOne({ name: req.params.name })

    if (!currentCheck) {
        return res.status(404).send('No Such Check found to run.....')
    }

    axios.interceptors.request.use(function (config) {

        config.metadata = { startTime: new Date() }
        return config

    }, function (error) {
        return Promise.reject(error)
    })

    axios.interceptors.response.use(

        function (response) {
            response.config.metadata.endTime = new Date()
            response.duration = response.config.metadata.endTime - response.config.metadata.startTime
            return response
        },
        function (error) {
            return Promise.reject(error)
        }
    )

    let visit = {}

    axios.get(currentCheck.url).then((response) => {

        visit = {
            timestamp: new Date(),
            responseDuration: response.duration,
            successful: true
        }

        mail.sendCheckUrlStatusEmail(req.user.email, req.user.name, currentCheck.url, 'Up');

        sendNotificationTowebhook(currentCheck.webhook , 'Up')
    })
    .catch((error) => {
         visit = {
            timestamp: new Date(),
            successful: false
        }

        mail.sendCheckUrlStatusEmail(req.user.email, req.user.name, currentCheck.url, 'Down');

        sendNotificationTowebhook(currentCheck.webhook , 'Down')

    })
    .then(async function () {
        try {
            currentCheck.visits.push(visit)
            await currentCheck.save()
        } catch (error) {
            throw new Error("A7eeeh error")
        }
    })
}

module.exports = monitor