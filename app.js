const express= require('express')
const userRoute = require('./src/routes/userRoute')
const checkRoute = require('./src/routes/checkRoute')

const app = express()


app.use(express.json())

app.use(userRoute)
app.use(checkRoute)


module.exports = app