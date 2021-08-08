const express=require('express')
const app = express()
const dotenv = require('dotenv')
const compression= require("compression")


dotenv.config({path:"./.env"})

//routers
const router = require('./src/routes/auth')
const adminrouter = require('./src/routes/admin/auth')
const categoryRouter= require("./src/routes/category")
const productRouter= require("./src/routes/product")

const port=process.env.PORT

//mongodb Database
require('./src/db/connectMongoose')

//middleware
app.use(express.json())
app.use(compression())
app.use('/api',router)
app.use('/api',adminrouter)
app.use('/api',categoryRouter)
app.use('/api',productRouter)



app.listen(port,()=>{
    console.log(`Listening to the port : ${port} `)
})