const express = require('express')
const app = express()
const dotenv = require('dotenv')
const compression = require("compression")
const path = require('path')
const cors = require('cors')

dotenv.config({ path: "./.env" })

//routers
const router = require('./src/routes/auth')
const adminrouter = require('./src/routes/admin/auth')
const categoryRouter = require("./src/routes/category")
const productRouter = require("./src/routes/product")
const addtoCart = require('./src/routes/cart')


const port = process.env.PORT

//mongodb Database
require('./src/db/connectMongoose')

//middleware
app.use(cors())
app.use(express.json())
app.use("/public", express.static(path.join(__dirname, 'src/uploads')))
app.use(compression())
app.use('/api', router)
app.use('/api', adminrouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)
app.use('/api', addtoCart)



app.listen(port, () => {
    console.log(`Listening to the port : ${port} `)
})