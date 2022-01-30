const app = require('./app')
const axios = require("axios")
const cron = require('node-cron');





const port =  3000

app.listen(port , ()=>{
    console.log(`server is running on port ${port} ..........`)
})
