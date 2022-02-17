import specialtyService from "../../services/specialtyService"

let createNewSpecialty = async (req, res) => {
   try {
      let info = await specialtyService.createNewSpecialty(req.body)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to create new specialty",
      })
   }
}

let createNewSpecialtyTranslation = async (req, res) => {
   try {
      let info = await specialtyService.createNewSpecialtyTranslation(req.body)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to create new specialty translation",
      })
   }
}

let getAllSpecialties = async (req, res) => {
   try {
      let info = await specialtyService.getAllSpecialties()
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to get all specialties",
      })
   }
}

let getSpecialtyById = async (req, res) => {
   try {
      let info = await specialtyService.getSpecialtyById(req.query.id)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to get a detail specialty",
      })
   }
}

let updateSpecialty = async (req, res) => {
   try {
      let info = await specialtyService.updateSpecialty(req.body)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to get a detail specialty",
      })
   }
}

let deleteSpecialty = async (req, res) => {
   try {
      let info = await specialtyService.deleteSpecialty(req.body.id)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to delete specialties",
      })
   }
}

module.exports = {
   createNewSpecialty,
   getAllSpecialties,
   getSpecialtyById,
   createNewSpecialtyTranslation,
   updateSpecialty,
   deleteSpecialty,
}
