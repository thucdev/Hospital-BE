import db from "../models"
import bcrypt from "bcrypt"
const salt = 10

let createDoctor = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data) {
            resolve({
               success: false,
               message: "Missing input parameter!",
            })
         } else {
            let isEmail = await db.User.findOne({
               where: { email: data.email },
            })
            if (isEmail) {
               resolve({
                  success: false,
                  message: "Email is already exist!",
               })
            } else {
               let hashPW = await hashUserPassword(data.password)

               let doctor = await db.User.findOrCreate({
                  where: {
                     email: data.email,
                  },
                  defaults: {
                     email: data.email,
                     password: hashPW,
                     fullName: data.fullName,
                     roleId: "R2",
                     image: data.image,
                  },
               })

               if (doctor) {
                  let res = await db.User.findOne({
                     where: {
                        email: data.email,
                     },
                  })
                  if (res) {
                     await db.Doctor_info.create({
                        doctorId: res.id,
                        language: data.language,
                        certificate: data.certificate,
                        degree: data.degree,
                        experience: data.experience,
                        member: data.member,
                        field: data.field,
                        specialtyId: data.specialtyId,
                     })
                  }
               } else {
                  resolve({
                     success: false,
                     message: "Create fail",
                  })
               }
            }
            resolve({
               success: true,
               message: "Oke",
            })
         }
      } catch (error) {
         reject(error)
      }
   })
}

let hashUserPassword = (password) => {
   return new Promise((resolve, reject) => {
      try {
         let hashPassword = bcrypt.hashSync(password, salt)
         resolve(hashPassword)
      } catch (error) {
         reject(error)
      }
   })
}

module.exports = {
   createDoctor,
}
