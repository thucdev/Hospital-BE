import userService from "../../services/userService"

let createAppointment = async (req, res) => {
   try {
      let info = await userService.getDoctorWithoutAppointment(req.body)
      // let info = await userService.createAppointment(req.body)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to create new appointment",
      })
   }
}
module.exports = {
   createAppointment,
}
