import db from "../models"
require("dotenv").config()

import { v4 as uuidv4 } from "uuid"

let buildUrlEmail = (doctorId, token) => {
   let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
   return result
}

//tim bac si chua co lich
let getDoctorWithoutAppointment = async () => {
   let allDoctor = await db.User.findAll({ where: { roleId: "R2" } })
   let doctorIdArr = allDoctor.reduce((doctorIds, item) => {
      return doctorIds.concat(item.id)
   }, [])

   let newSchedules = await db.Schedule.findAll({ where: { status: "S1" } })
   let doctorIdHadSchedule = newSchedules.reduce((doctorIds, item) => {
      return doctorIds.concat(item.doctorId)
   }, [])

   // tim doctor ko co trong doctorIdHadSchedule
   let differentId = _.difference(doctorIdArr, doctorIdHadSchedule)
   if (differentId.length > 0) {
      let doctorIdRandom = Math.floor(Math.random() * differentId.length)
      return (doctorId = differentId[doctorIdRandom])
   } else {
      //sort doctor
   }
}

let createAppointment = async (data) => {
   try {
      //gui email co id bac si
      //tao data trong table schedule
      //tim xem user da co account chua, chua co thi tao
      //co roi thi sua
      if (
         !data.email ||
         !data.doctorId ||
         !data.date ||
         !data.address ||
         !data.selectedGender ||
         !data.timeType ||
         !data.fullName
      ) {
         resolve({
            errCode: 1,
            errMessage: "Missing input parameter",
         })
      } else {
         //tao token
         let token = uuidv4()

         //tim bac si chua co lich

         await emailService.sendSimpleEmail({
            receiverEmail: data.email,
            patientName: data.fullName,
            time: data.timeString,
            doctorName: data.doctorName,
            language: data.language,
            redirectLink: buildUrlEmail(data.doctorId, token),
         })

         //upsert patient
         let user = await db.User.findOrCreate({
            where: {
               email: data.email,
            },
            defaults: {
               email: data.email,
               roleId: "R3",
               gender: data.selectedGender,
               address: data.address,
               firstName: data.fullName,
            },
         })

         if (user && user[0]) {
            await db.Booking.findOrCreate({
               where: {
                  patientId: user[0].id,
               },
               defaults: {
                  statusId: "S1",
                  doctorId: data.doctorId,
                  patientId: user[0].id,
                  date: data.date,
                  timeType: data.timeType,
                  token: token,
               },
            })
         }
         // create booking record
         resolve({
            errCode: 0,
            errMessage: "Save schedule success",
         })
      }
   } catch (error) {
      console.log(error)
   }
}
module.exports = {
   createAppointment,
   getDoctorWithoutAppointment,
}
