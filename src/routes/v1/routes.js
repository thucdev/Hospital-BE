import express from "express"
import Authentication from "../../controllers/AuthController/Authentication"
import checkRole from "../../controllers/AuthController/middleware/checkRole"
import verifyToken from "../../controllers/AuthController/middleware/verifyToken"
import adminController from "../../controllers/DoctorController/adminController"
import doctorController from "../../controllers/DoctorController/doctorController"
import specialtyController from "../../controllers/DoctorController/specialtyController"
import userController from "../../controllers/UserController/userController"

let router = express.Router()

const webRoute = (app) => {
   router.get("/", (req, res) => {
      res.send("welcome to backend")
   })
   router.post("/v1/api/register", Authentication.register)
   router.post("/v1/api/login", Authentication.login)
   router.post("/v1/api/logout", verifyToken, Authentication.logout)
   router.get("/v1/api/auth", verifyToken, Authentication.checkUserIsLogin)

   //refresh token
   router.post("/v1/api/refresh", Authentication.requestRefreshToken)

   router.get("/v1/api/specialties/:id", specialtyController.getSpecialtyById)
   router.get("/v1/api/specialties", specialtyController.getAllSpecialties)
   router.post(
      "/v1/api/specialties",
      verifyToken,
      checkRole.checkAdmin,
      specialtyController.createNewSpecialty
   )
   router.post(
      "/v1/api/specialty-translation",
      verifyToken,
      checkRole.checkAdmin,
      specialtyController.createNewSpecialtyTranslation
   )
   router.put(
      "/v1/api/specialties/:id",
      verifyToken,
      checkRole.checkAdmin,
      specialtyController.updateSpecialty
   )
   router.delete(
      "/v1/api/specialties/:id",
      verifyToken,
      checkRole.checkAdmin,
      specialtyController.deleteSpecialty
   )
   router.post("/v1/api/is-email-exist", checkRole.checkAdmin, adminController.isEmailExist)

   router.get("/v1/api/doctors", adminController.getAllDoctor)
   router.get("/v1/api/doctors/:id", userController.getDoctorById)
   router.get("/v1/api/pagination-doctors", adminController.paginationDoctor)
   router.post("/v1/api/doctor", verifyToken, checkRole.checkAdmin, adminController.createDoctor)
   router.delete(
      "/v1/api/doctor/:id",
      verifyToken,
      checkRole.checkAdmin,
      adminController.deleteDoctor
   )
   router.get("/v1/api/schedules", adminController.getAllSchedules)
   router.post(
      "/v1/api/get-all-schedules-by-doctor",
      checkRole.checkDoctor,
      doctorController.getAllSchedules
   )

   router.post("/v1/api/appointments", userController.createAppointment)
   router.post("/v1/api/verify-appointment", userController.verifyBookAppointment)
   router.post("/v1/api/questions", userController.createQuestion)

   router.get("/v1/api/news/:id", userController.getNewsById)
   router.get("/v1/api/news", doctorController.getNews)
   router.post("/v1/api/news", verifyToken, checkRole.checkAdmin, doctorController.createNews)

   return app.use("/", router)
}

module.exports = webRoute
