import db from "../models"
// import specialtyTranslation from '../models/specialtyTranslation'
// import Specialty from '../models/specialty'

let createNewSpecialty = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data) {
            resolve({
               success: false,
               message: "Missing input parameter!",
            })
         } else {
            await db.Specialty.create({
               title: data.title,
               img: data.img,
               descriptionHTML: data.descriptionHTML,
               descriptionMarkdown: data.descriptionMarkdown,
            })
            resolve({
               success: true,
               message: "Create Successfully",
            })
         }
      } catch (error) {
         reject(error)
      }
   })
}

let createNewSpecialtyTranslation = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data) {
            resolve({
               success: false,
               message: "Missing input parameter!",
            })
         } else {
            await db.specialty_translation.findOrCreate({
               where: {
                  specialtyId: data.specialtyId,
               },
               defaults: {
                  specialtyId: data.specialtyId,
                  title: data.title,
                  descriptionHTML: data.descriptionHTML,
                  descriptionMarkdown: data.descriptionMarkdown,
                  langCode: data.code,
               },
            })
            resolve({
               success: true,
               message: "Translate successfully",
            })
         }
      } catch (error) {
         reject(error)
      }
   })
}

let getAllSpecialties = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.Specialty.findAll({
            include: [
               {
                  model: db.specialty_translation,
                  as: "translationData",
                  attributes: [
                     "descriptionHTML",
                     "descriptionMarkdown",
                     "title",
                     "langCode",
                     "updatedAt",
                  ],
               },
            ],
            nest: true,
            raw: true,
         })
         if (data && data.length > 0) {
            data.map((item) => {
               item.img = Buffer.from(item.img, "base64").toString("binary")
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

let getSpecialtyById = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.Specialty.findOne({
            where: { id: id },
            include: [
               {
                  model: db.specialty_translation,
                  as: "translationData",
                  attributes: [
                     "descriptionHTML",
                     "descriptionMarkdown",
                     "title",
                     "langCode",
                     // 'updatedAt',
                  ],
               },
            ],
            nest: true,
            raw: true,
         })
         if (data && data.length > 0) {
            data.img = Buffer.from(data.img, "base64").toString("binary")
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

let updateSpecialty = (data) => {
   return new Promise(async (resolve, reject) => {
      console.log("data", data)
      try {
         if (!data || !data.code) {
            resolve({
               success: false,
               message: "Missing input parameter!",
            })
         } else {
            if (data.code === "vn") {
               let specialtyData = await db.Specialty.findOne({
                  where: { id: data.specialtyId },
                  raw: false,
               })
               if (specialtyData) {
                  specialtyData.img = data.imgBase64
                  specialtyData.title = data.title
                  specialtyData.descriptionHTML = data.descriptionHTML
                  specialtyData.descriptionMarkdown = data.descriptionMarkdown
                  await specialtyData.save()
               }
               resolve({
                  success: true,
                  message: "Update to specialty table successfully!",
               })
            } else {
               let specialtyTranslation = await db.Specialty.findOne({
                  where: { id: data.specialtyId },
                  raw: false,
               })
               if (specialtyTranslation) {
                  specialtyTranslation.title = data.title
                  specialtyTranslation.descriptionHTML = data.descriptionHTML
                  specialtyTranslation.descriptionMarkdown = data.descriptionMarkdown
                  await specialtyTranslation.save()
               }

               if (data.imgBase64) {
                  let specialtyData = await db.Specialty.findOne({
                     where: { id: data.specialtyId },
                     raw: false,
                  })
                  if (specialtyData) {
                     specialtyData.img = data.imgBase64
                     await specialtyData.save()
                  }
               }
               resolve({
                  success: true,
                  message: "Update to specialty translation table successfully!",
               })
            }
         }
      } catch (error) {
         reject(error)
      }
   })
}

let deleteSpecialty = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let specialty = await db.Specialty.findOne({
            where: { id: id },
         })
         let specialtyTranslation = await db.specialty_translation.findOne({
            where: { specialtyId: id },
         })
         if (specialty || specialtyTranslation) {
            await db.Specialty.destroy({
               where: { id: id },
            })
            await db.specialty_translation.findOne({
               where: { specialtyId: id },
            })
            resolve({
               success: true,
               message: "Delete specialty success",
            })
         } else {
            resolve({
               success: false,
               message: "Delete specialty fail",
            })
         }
      } catch (error) {
         reject(error)
      }
   })
}
module.exports = {
   createNewSpecialty,
   getAllSpecialties,
   getSpecialtyById,
   createNewSpecialtyTranslation,
   updateSpecialty,
   deleteSpecialty,
}
