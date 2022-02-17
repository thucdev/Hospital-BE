import db from "../models"

let getAllSchedules = (doctorId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.Schedule.findAll({
            where: { status: "S2", doctorId },
            include: [
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

module.exports = {
   getAllSchedules,
}
