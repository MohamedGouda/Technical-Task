const cron = require('node-cron');
const axios = require("axios")


console.log(23)
cron.schedule('* * * * *', function() {
    axios({
        method: 'post',
        url: 'http://localhost:3000/checks/Run/googleCheck',
        data: {
            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWY0Mzg4Yzc0MmYwNjBkZjM3NzljNDAiLCJpYXQiOjE2NDMzOTcyODh9.RgsSFqVMO7c00PyUjL1Yoc6Ojm_XmQrPQ_5tHm6ymCo"
        }
      }).then(()=>{
          console.log("Notification Send to Webhook")
      })
      .catch((error)=>{
          console.log("Error while sending Notification to webhook")
      })
    console.log('running a task every minute');
  });

