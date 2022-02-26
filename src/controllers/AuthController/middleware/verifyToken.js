import jwt from "jsonwebtoken"
require("dotenv").config()

const verifyToken = async (req, res, next) => {
   try {
      const token = req.headers.authorization
      console.log("token", token)
      if (token) {
         const accessToken = token.split(" ")[1]
         await jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
               return res.json({ success: false, message: "Token is not valid" })
            }
            req.user = user
         })
         next()
      } else {
         return res.json({ success: false, message: "You are not authenticated" })
      }
   } catch (error) {
      console.log("", error)
   }
}

module.exports = verifyToken
