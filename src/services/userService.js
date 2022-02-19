import db from "../models"
require("dotenv").config()
import _ from "lodash"
import emailService from "../services/emailService"

import { v4 as uuidv4 } from "uuid"

let buildUrlEmail = (doctorId, token) => {
   let result = `${process.env.URL_REACT}/verify-appointment?token=${token}&doctorId=${doctorId}`
   // let result = `${process.env.URL_REACT}/verify-booking?token=${token}`
   return result
}

let getDoctorWithoutAppointment = async (specialtyId, dateBooked, timeBooked) => {
   let allDoctor = await db.User.findAll({ where: { roleId: "R2", specialtyId } })
   let doctorIdArr = allDoctor.reduce((doctorIds, item) => {
      return doctorIds.concat(item.id)
   }, [])

   let newSchedules = await db.Schedule.findAll({ where: { status: "S1" } })
   let doctorIdHadSchedule = newSchedules.reduce((doctorIds, item) => {
      return doctorIds.concat(item.doctorId)
   }, [])

   // find list doctor not in doctorIdHadSchedule
   let differentId = _.difference(doctorIdArr, doctorIdHadSchedule)
   if (differentId.length > 0) {
      let doctorIdRandom = Math.floor(Math.random() * differentId.length)
      let doctorId = differentId[doctorIdRandom]
      return doctorId
   } else {
      let checkDuplicateDate = newSchedules.filter((item) => item.dateBooked !== dateBooked)
      if (checkDuplicateDate.length > 0) {
         let doctorIdRandom = Math.floor(Math.random() * checkDuplicateDate.length)
         let doctorId = checkDuplicateDate[doctorIdRandom].doctorId
         return doctorId
      } else {
         let checkDuplicateTime = newSchedules.filter((item) => item.timeBooked !== timeBooked)
         if (checkDuplicateTime.length > 0) {
            let doctorIdRandom = Math.floor(Math.random() * checkDuplicateTime.length)
            let doctorId = checkDuplicateTime[doctorIdRandom].doctorId
            return doctorId
         } else {
            return {
               success: false,
               message: "Please choose another time.",
            }
         }
      }
   }
}

let createAppointment = async (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (
            !data.email ||
            !data.dateBooked ||
            !data.timeBooked ||
            !data.specialtyId ||
            !data.fullName
         ) {
            resolve({
               success: false,
               message: "Missing input parameter!",
            })
         } else {
            let token = uuidv4()

            //find doctor without appointment
            let doctorId = await getDoctorWithoutAppointment(
               data.specialtyId,
               data.dateBooked,
               data.timeBooked
            )

            let doctorName = await db.User.findOne({ where: { id: doctorId } })
            let time = await db.Role.findOne({ where: { keyMap: data.timeBooked } })
            await emailService.sendSimpleEmail({
               receiverEmail: data.email,
               patientName: data.fullName,
               time: time.valueVi,
               doctorName: doctorName.fullName,
               language: "vi",
               redirectLink: buildUrlEmail(doctorId, token),
               // language: data.language,
            })

            //upsert patient
            let user = await db.User.findOrCreate({
               where: {
                  email: data.email,
               },
               defaults: {
                  email: data.email,
                  roleId: "R3",
                  fullName: data.fullName,
                  phoneNumber: data.phoneNumber,
               },
            })

            //check user has had an appointment
            let isBooked = await db.Schedule.findOne({
               where: {
                  patientId: user[0].id,
                  status: "S1",
               },
            })
            if (isBooked) {
               resolve({
                  success: false,
                  message: "You are already have an appointment. Please check your email",
               })
               return
            } else {
               //create an appointment
               if (user && user[0]) {
                  // if email is already exist, create schedule
                  await db.Schedule.create({
                     status: "S1",
                     doctorId: doctorId,
                     patientId: user[0].id,
                     dateBooked: data.dateBooked,
                     timeBooked: time.valueVi,
                     reason: data.reason,
                     token: token,
                  })
                  resolve({
                     success: true,
                     message: "Booking success",
                  })
               } else {
                  resolve({
                     success: false,
                     message: "Booking fail",
                  })
               }
               resolve({
                  success: true,
                  message: "Booking success",
               })
            }
         }
      } catch (error) {
         console.log("er", error)
         reject(error)
      }
   })
}

let verifyBookAppointment = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data.token || !data.doctorId) {
            resolve({
               success: false,
               message: "Error when trying to verify new appointment",
            })
         } else {
            let appointment = await db.Schedule.findOne({
               where: {
                  doctorId: data.doctorId,
                  token: data.token,
                  status: "S1",
               },
               raw: false,
            })
            if (appointment) {
               appointment.status = "S2"

               await appointment.save()
               resolve({
                  success: true,
                  message: "Update the appointment succeed",
               })
            } else {
               resolve({
                  success: false,
                  message: "Schedule has been activated or doest not exist",
               })
            }
         }
      } catch (error) {
         console.log("er", error)
         reject(error)
      }
   })
}

let getDoctorById = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.User.findOne({
            where: { id: id },
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

let createQuestion = async (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data.email) {
            resolve({
               success: false,
               message: "Missing input parameter!",
            })
         } else {
            await db.Question.create({
               email: data.email,
               phoneNumber: data.phoneNumber,
               fullName: data.fullName,
               content: data.reason,
            })
            resolve({
               success: true,
               message: "Send a question successfully",
            })
         }
      } catch (error) {
         console.log("er", error)
         reject(error)
      }
   })
}

module.exports = {
   createAppointment,
   verifyBookAppointment,
   getDoctorById,
   createQuestion,
}
