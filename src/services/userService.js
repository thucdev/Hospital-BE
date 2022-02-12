import db from "../models"
require("dotenv").config()
import _ from "lodash"

import { v4 as uuidv4 } from "uuid"

let buildUrlEmail = (doctorId, token) => {
   let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
   return result
}

//tim bac si chua co lich
let getDoctorWithoutAppointment = async (specialtyId, dateBooked, timeBooked) => {
   let allDoctor = await db.User.findAll({ where: { roleId: "R2", specialtyId } })
   let doctorIdArr = allDoctor.reduce((doctorIds, item) => {
      return doctorIds.concat(item.id)
   }, [])

   let newSchedules = await db.Schedule.findAll({ where: { status: "S1" } })
   let doctorIdHadSchedule = newSchedules.reduce((doctorIds, item) => {
      return doctorIds.concat(item.doctorId)
   }, [])

   // tim doctor ko co trong doctorIdHadSchedule
   let differentId = _.difference(doctorIdArr, doctorIdHadSchedule)
   console.log("differentId", differentId)
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
         //gui email co id bac si
         //tao data trong table schedule
         //tim xem user da co account chua, chua co thi tao
         //co roi thi sua
         if (
            !data.email
            // !data.doctorId||
            // !data.date ||
            // !data.address ||
            // !data.selectedGender ||
            // !data.timeType ||
            // !data.fullName
         ) {
            resolve({
               success: false,
               message: "Missing input parameter!",
            })
         } else {
            //tao token
            let token = uuidv4()

            //tim bac si chua co lich
            // let doctorId = await getDoctorWithoutAppointment(data.specialtyId)
            let doctorId = await getDoctorWithoutAppointment()

            // await emailService.sendSimpleEmail({
            //    receiverEmail: data.email,
            //    patientName: data.fullName,
            //    time: data.timeString,
            //    doctorName: data.doctorName,
            //    language: data.language,
            //    redirectLink: buildUrlEmail(data.doctorId, token),
            // })

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
            console.log("user", user)

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
                  // co email roi tao them schedule
                  let res = await db.Schedule.create({
                     status: "S1",
                     doctorId: doctorId,
                     patientId: user[0].id,
                     dateBooked: data.dateBooked,
                     timeBooked: data.timeBooked,
                     reason: data.reason,
                     // token: token,
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
               // create booking record
               resolve({
                  success: true,
                  message: "Booking success",
               })
            }
         }
      } catch (error) {
         console.log(error)
      }
   })
}
module.exports = {
   createAppointment,
   getDoctorWithoutAppointment,
}
