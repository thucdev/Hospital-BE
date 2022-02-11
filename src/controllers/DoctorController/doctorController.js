import doctorService from "../../services/doctorService"

let createDoctor = async (req, res) => {
   try {
      let info = await doctorService.createDoctor(req.body)
      return res.status(200).json(info)
   } catch (error) {
      console.log(error)
      return res.status(200).json({
         success: false,
         message: "Error when trying to create new specialty",
      })
   }
}
module.exports = {
   createDoctor,
}
