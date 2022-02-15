import express from "express"
require("dotenv").config()
import connectDB from "./config/connectDB"
import webRoute from "./routes/v1/routes.js"
import { errorHandler } from "./controllers/AuthController/middleware/errorHandler"
import cors from "cors"
// var cors = require('cors')

const app = express()
app.use(cors())

connectDB()

const hostname = "localhost"
const port = 8080

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

webRoute(app)

//unhandle route
app.all("*", (req, res, next) => {
   const err = new Error("The route can not be found")
   err.statusCode = 404
   next(err)
})
app.use(errorHandler)

app.listen(port, hostname, () => {
   console.log(`Hello Thucidol, I am running at ${hostname}:${port}/`)
})
