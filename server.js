const express= require('express')
const userRoute = require('./src/routes/userRoute')
const checkRoute = require('./src/routes/checkRoute')

const app = express()


app.use(express.json())

app.use(userRoute)
app.use(checkRoute)


const port =  3000

app.listen(port , ()=>{
    console.log(`server is running on port ${port} ..........`)
})