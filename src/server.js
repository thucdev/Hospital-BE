import cors from "cors"
import express from "express"
import connectDB from "./config/connectDB"
import { errorHandler } from "./controllers/AuthController/middleware/errorHandler"
import webRoute from "./routes/v1/routes.js"
let cookieParser = require("cookie-parser")
require("dotenv").config()

const app = express()
app.use(cookieParser())
let corsOptions = {
   origin: "http://localhost:3000",
   credentials: true,
}
app.use(cors(corsOptions))

connectDB()

const hostname = "localhost"
const port = 8080

app.use(function (req, res, next) {
   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
   res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
   res.setHeader("Access-Control-Allow-Credentials", true)
   next()
})

app.use(express.json({ limit: "80mb" }))
app.use(express.urlencoded({ limit: "80mb", extended: true, parameterLimit: 50000 }))

webRoute(app)

//unhandle route
app.all("*", (req, res, next) => {
   const err = new Error("The route can not be found")
   err.statusCode = 404
   next(err)
})
app.use(errorHandler)

app.listen(process.env.PORT || 8080, hostname, () => {
   console.log(`Hello Thucidol, I am running at ${hostname}:${port}/`)
})
