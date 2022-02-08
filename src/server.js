import express from 'express'
require('dotenv').config()
import connectDB from './config/connectDB'
import webRoute from './routes/v1/routes.js'

var cors = require('cors')

const app = express()
app.use(cors())

connectDB()

const hostname = 'localhost'
const port = 8080

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

webRoute(app)

app.listen(port, hostname, () => {
    console.log(`Hello Thucidol, I am running at ${hostname}:${port}/`)
})
