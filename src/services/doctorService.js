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

let createNews = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data) {
            resolve({
               success: false,
               message: "Missing input parameter!",
            })
         } else {
            await db.News.create({
               title: data.title,
               img: data.img,
               descriptionHTML: data.descriptionHTML,
               descriptionMarkdown: data.descriptionMarkdown,
            })
            resolve({
               success: true,
               message: "Create News Successfully",
            })
         }
      } catch (error) {
         reject(error)
      }
   })
}

let getNews = (data) => {
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

            let size = 5
            if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 5) {
               size = sizeAsNumber
            }

            // const skipItems = (pageNumber -1) * size
            let res = await db.News.findAndCountAll({ limit: size, offset: pageNumber * size })
            if (res && res.rows.length > 0) {
               res.rows.map((item) => {
                  item.img = Buffer.from(item.img, "base64").toString("binary")
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

module.exports = {
   getAllSchedules,
   createNews,
   getNews,
}
