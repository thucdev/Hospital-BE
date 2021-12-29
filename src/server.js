import express from 'express'
require('dotenv').config()
import connectDB from './config/connectDB'
import webRoute from './routes/v1/routes.js'

const app = express()
connectDB()

const hostname = 'localhost'
const port = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

webRoute(app)

app.listen(port, hostname, () => {
    console.log(`Hello Trung Quan Dev, I am running at ${hostname}:${port}/`)
})
