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

   router.post(
      "/v1/api/create-new-specialty",
      verifyToken,
      checkRole.checkAdmin,
      specialtyController.createNewSpecialty
   )
   router.post(
      "/v1/api/create-new-specialty-translation",
      verifyToken,
      checkRole.checkAdmin,
      specialtyController.createNewSpecialtyTranslation
   )
   router.get("/v1/api/get-all-specialties", specialtyController.getAllSpecialties)
   router.get("/v1/api/get-specialty-by-id/", specialtyController.getSpecialtyById)
   router.put(
      "/v1/api/update-specialty",
      verifyToken,
      checkRole.checkAdmin,
      specialtyController.updateSpecialty
   )
   router.delete(
      "/v1/api/delete-specialty",
      verifyToken,
      checkRole.checkAdmin,
      specialtyController.deleteSpecialty
   )
   router.delete(
      "/v1/api/delete-doctor",
      verifyToken,
      checkRole.checkAdmin,
      adminController.deleteDoctor
   )

   router.post(
      "/v1/api/create-doctor",
      verifyToken,
      checkRole.checkAdmin,
      adminController.createDoctor
   )
   router.get("/v1/api/get-doctor-by-id/", userController.getDoctorById)
   router.get("/v1/api/doctors", adminController.paginationDoctor)
   router.get("/v1/api/get-all-doctors", adminController.getAllDoctor)
   router.get("/v1/api/get-all-schedules", adminController.getAllSchedules)
   router.post("/v1/api/is-email-exist", checkRole.checkAdmin, adminController.isEmailExist)

   router.post(
      "/v1/api/get-all-schedules-by-doctor",
      checkRole.checkDoctor,
      doctorController.getAllSchedules
   )

   router.post("/v1/api/create-an-appointment", userController.createAppointment)
   router.post("/v1/api/verify-appointment", userController.verifyBookAppointment)
   router.post("/v1/api/create-question", userController.createQuestion)

   router.post(
      "/v1/api/create-news",
      verifyToken,
      checkRole.checkAdmin,
      doctorController.createNews
   )
   router.get("/v1/api/news", doctorController.getNews)
   router.get("/v1/api/get-news-by-id/", userController.getNewsById)

   return app.use("/", router)
}

module.exports = webRoute
