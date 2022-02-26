import bcrypt from "bcrypt"
import db from "../models"
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
                     address: data.address,
                     phoneNumber: data.phoneNumber,
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
         let res = await db.User.findAndCountAll({
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

         if (res && res.rows) {
            res.rows.map((item) => {
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
            data: res.rows,
            total: res.count,
         })
      } catch (error) {
         reject(error)
      }
   })
}

let paginationDoctor = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         const { page, limit } = data
         if (!data) {
            resolve({
               success: false,
               message: "Missing input parameter!",
            })
         } else {
            const pageAsNumber = Number.parseInt(page)
            const sizeAsNumber = Number.parseInt(limit)

            let pageNumber = 0
            if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
               pageNumber = pageAsNumber
            }

            let size = 6
            if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 7) {
               size = sizeAsNumber
            }

            // const skipItems = (pageNumber -1) * size
            let res = await db.User.findAndCountAll({
               where: {
                  roleId: "R2",
               },
               offset: pageNumber * size,
               limit: size,
            })

            if (res) {
               res.rows.map((item) => {
                  item.image = Buffer.from(item.image, "base64").toString("binary")
               })
            }

            resolve({
               success: true,
               data: res.rows,
               totalPages: Math.ceil(res.count / size),
               total: res.count,
            })
         }
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

let deleteDoctor = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let doctor = await db.Doctor.findOne({
            where: { id: id },
         })
         let doctorInfo = await db.Doctor_info.findOne({
            where: { doctorId: id },
         })
         if (doctor && doctorInfo) {
            await db.Doctor.destroy({
               where: { id: id },
            })
            await db.Doctor_info.findOne({
               where: { specialtyId: id },
            })
            resolve({
               success: true,
               message: "Delete doctor success",
            })
         } else {
            resolve({
               success: false,
               message: "Delete doctor fail",
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
   paginationDoctor,
   deleteDoctor,
}
