import doctorService from "../../services/doctorService"

let getAllSchedules = async (req, res) => {
   try {
      let info = await doctorService.getAllSchedules(req.body.doctorId)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to get all specialties",
      })
   }
}

module.exports = { getAllSchedules }
