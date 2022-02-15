import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
require("dotenv").config()

import db from "../../models/index"

let refreshTokens = [] // binh thuong se luu vao redis cho khoi bi trung lap

//@route GET api/auth
//@desc Check if user is logged in
//@access Public
const checkUserIsLogin = async (req, res, next) => {
   try {
      // const user = await User.scope('withoutPassword').findOne({ where: { id: req.id } })
      const user = await db.User.findOne({ where: { id: req.user.id } })
      if (!user) {
         const err = new Error("User not found")
         err.statusCode = 400
         return next(err)
      }
      // return res.status(200).json({ success: false, message: "User not found" })

      return res.json({ success: true, user })
   } catch (error) {
      // console.log("e", error)
      // return res.status(500).json({ success: false, message: "Internal error server" })
   }
}

const register = async (req, res) => {
   const { email, password } = req.body
   if (!email || !password) {
      const err = new Error("Missing email or password")
      err.statusCode = 400
      return next(err)
      // return res.status(400).json({ success: false, message: "Missing email or password" })
   }

   try {
      //check existing user
      const user = await db.User.findOne({
         where: { email: req.body.email },
         raw: true,
      })
      console.log("try")
      if (user) {
         const err = new Error("Email is already exist.")
         err.statusCode = 400
         return next(err)
         // return res.status(400).json({ success: false, message: "Email is already exist." })
      }

      const salt = bcrypt.genSaltSync(10)
      const hashPW = bcrypt.hashSync(req.body.password, salt)

      //create user
      const newUser = await db.User.create({
         email: req.body.email,
         password: hashPW,
         // firstName: data.firstName,
         // lastName: data.lastName,
         // address: data.address,
         // phoneNumber: data.phoneNumber,
         // gender: data.gender === 1 ? true : false,
         roleId: "R3",
      })
      return res.status(200).json({
         success: true,
         message: "Create user successfully",
      })
   } catch (error) {
      console.log(error)
      return res.status(500).json({
         success: false,
         message: "Error from server create new user",
      })
   }
}

// create access token
const generateAccessToken = (data) => {
   const accessToken = jwt.sign(
      {
         id: data.id,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30s" }
   )
   return accessToken
}
// refresh token
const generateRefreshToken = (data) => {
   const refreshToken = jwt.sign(
      {
         id: data.id,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "30d" }
   )
   return refreshToken
}

// Login

const login = async (req, res) => {
   const { email, password } = req.body
   if (!email || !password)
      return res.status(400).json({ success: false, message: "Missing email or password" })

   // let userData = {}
   try {
      const user = await db.User.findOne({
         where: { email: req.body.email },
         raw: true,
      })
      if (!user)
         return res.status(200).json({ success: false, message: "Wrong username or password!" })

      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if (!validPassword)
         return res.status(200).json({ success: false, message: "Wrong username or password!" })

      if (user && validPassword) {
         const accessToken = generateAccessToken(user)
         const refreshToken = generateRefreshToken(user)
         //add refreshToken to cookie
         res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // set = true when deploy
            path: "/",
            sameSite: "strict",
         })

         delete user.password
         // userData.user = user
         return res.status(200).json({ accessToken, success: true })
      }
   } catch (error) {
      console.log("err", error)
   }
}

const requestRefreshToken = (req, res) => {
   // take refresh token from user
   const refreshToken = req.cookie.refreshToken
   if (!refreshToken)
      return res.status(401).json({ success: false, message: "You are not authenticated!" })
   if (!refreshTokens.includes(refreshToken))
      return res.status(401).json({ success: false, message: "Token is not invalid" })

   jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
         console.log("err", err)
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken)

      const newAccessToken = generateAccessToken(user)
      const newRefreshToken = generateRefreshToken(user)
      refreshTokens.push(newRefreshToken)
      //add refreshToken to cookie
      res.cookie("refreshToken", newRefreshToken, {
         httpOnly: true,
         secure: false, // set = true when deploy
         path: "/",
         sameSite: "strict",
      })
      return res.status(200).json({ success: true, newAccessToken })
   })
}

const logout = (req, res) => {
   res.clearCookie("refreshToken")
   refreshTokens = refreshTokens.filter((token) => token !== req.cookie.refreshToken)
   return res.status(200).json({ success: true, message: "Logout successfully" })
}

module.exports = {
   register,
   login,
   logout,
   requestRefreshToken,
   checkUserIsLogin,
}
