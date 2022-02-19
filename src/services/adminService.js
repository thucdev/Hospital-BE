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
                     specialtyId: data.specialtyId,
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

let getAllDoctor = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.User.findAll({
            where: { roleId: "R2" },
            include: [
               {
                  model: db.Doctor_info,
                  as: "doctor_infoData",
                  attributes: [
                     "language",
                     "certificate",
                     "degree",
                     "experience",
                     "member",
                     "field",
                  ],
               },
            ],
            nest: true,
            raw: true,
         })
         if (data && data.length > 0) {
            data.map((item) => {
               item.image = Buffer.from(item.image, "base64").toString("binary")
               item.doctor_infoData.experience = JSON.parse(item.doctor_infoData.experience)
               item.doctor_infoData.degree = JSON.parse(item.doctor_infoData.degree)
               item.doctor_infoData.certificate = JSON.parse(item.doctor_infoData.certificate)
               item.doctor_infoData.member = JSON.parse(item.doctor_infoData.member)
               item.doctor_infoData.field = JSON.parse(item.doctor_infoData.field)
            })
         }
         resolve({
            success: true,
            data: data,
         })
      } catch (error) {
         reject(error)
      }
   })
}

let getAllSchedules = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.Schedule.findAll({
            where: { status: "S2" },
            include: [
               {
                  model: db.User,
                  as: "doctorData",
                  attributes: ["fullName"],
               },
               {
                  model: db.User,
                  as: "patientData",
                  attributes: ["fullName", "phoneNumber"],
               },
            ],
            nest: true,
            raw: true,
         })
         resolve({
            success: true,
            data: data,
         })
      } catch (error) {
         reject(error)
      }
   })
}

let isEmailExist = (email) => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.User.findOne({
            where: { email },
         })
         if (data) {
            resolve({
               success: true,
               message: "Email is already exist!",
            })
         } else {
            resolve({
               success: false,
               message: "Email is not exist!",
            })
         }
      } catch (error) {
         reject(error)
      }
   })
}
module.exports = {
   createDoctor,
   getAllDoctor,
   getAllSchedules,
   isEmailExist,
}
