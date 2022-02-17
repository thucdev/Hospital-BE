import adminService from "../../services/adminService"

let createDoctor = async (req, res) => {
   try {
      let info = await adminService.createDoctor(req.body)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to create new specialty",
      })
   }
}

let getAllDoctor = async (req, res) => {
   try {
      let info = await adminService.getAllDoctor()
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to create new specialty",
      })
   }
}

let getAllSchedules = async (req, res) => {
   try {
      let info = await adminService.getAllSchedules()
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to create new specialty",
      })
   }
}

let isEmailExist = async (req, res) => {
   try {
      let info = await adminService.isEmailExist(req.body.email)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to check email",
      })
   }
}
module.exports = {
   createDoctor,
   getAllDoctor,
   getAllSchedules,
   isEmailExist,
}
