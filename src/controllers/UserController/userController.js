import userService from "../../services/userService"

let createAppointment = async (req, res) => {
   try {
      let info = await userService.createAppointment(req.body)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to create new appointment",
      })
   }
}

let verifyBookAppointment = async (req, res) => {
   try {
      let info = await userService.verifyBookAppointment(req.body)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to verify appointment",
      })
   }
}

let getDoctorById = async (req, res) => {
   try {
      let info = await userService.getDoctorById(req.query.id)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to get a detail doctor",
      })
   }
}

let getNewsById = async (req, res) => {
   try {
      let info = await userService.getNewsById(req.params.id)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to get a detail doctor",
      })
   }
}

let createQuestion = async (req, res) => {
   try {
      let info = await userService.createQuestion(req.body)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to get a detail doctor",
      })
   }
}

module.exports = {
   createAppointment,
   verifyBookAppointment,
   getDoctorById,
   createQuestion,
   getNewsById,
}
