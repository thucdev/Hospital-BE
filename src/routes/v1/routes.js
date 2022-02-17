import express from "express"
import Authentication from "../../controllers/AuthController/Authentication"
import specialtyController from "../../controllers/DoctorController/specialtyController"
import adminController from "../../controllers/DoctorController/adminController"
import doctorController from "../../controllers/DoctorController/doctorController"
import userController from "../../controllers/UserController/userController"
import verifyToken from "../../controllers/AuthController/middleware/verifyToken"
import checkRole from "../../controllers/AuthController/middleware/checkRole"

let router = express.Router()

const webRoute = (app) => {
   router.post("/v1/api/register", Authentication.register)
   router.post("/v1/api/login", Authentication.login)
   router.post("/v1/api/logout", verifyToken, Authentication.logout)
   router.get("/v1/api/auth", verifyToken, Authentication.checkUserIsLogin)

   //refresh token
   router.post("/v1/api/refresh", Authentication.requestRefreshToken)

   router.post(
      "/v1/api/create-new-specialty",
      // verifyToken,
      // checkRole.checkAdmin,
      specialtyController.createNewSpecialty
   )
   router.post(
      "/v1/api/create-new-specialty-translation",
      // verifyToken,
      // checkRole.checkAdmin,
      specialtyController.createNewSpecialtyTranslation
   )
   router.get("/v1/api/get-all-specialties", specialtyController.getAllSpecialties)
   router.get(
      "/v1/api/get-specialty-by-id/",
      // verifyToken,
      specialtyController.getSpecialtyById
   )
   router.put(
      "/v1/api/update-specialty",
      // verifyToken,
      // checkRole.checkAdmin,
      specialtyController.updateSpecialty
   )
   router.delete(
      "/v1/api/delete-specialty",
      // verifyToken,
      // checkRole.checkAdmin,
      specialtyController.deleteSpecialty
   )

   router.post(
      "/v1/api/create-doctor",
      // verifyToken,
      // checkRole.checkAdmin,
      adminController.createDoctor
   )
   router.post("/v1/api/get-doctor-by-id/", userController.getDoctorById)
   router.get("/v1/api/get-all-doctors", adminController.getAllDoctor)
   router.get("/v1/api/get-all-schedules", adminController.getAllSchedules)
   router.post(
      "/v1/api/is-email-exist", // checkRole.checkAdmin,
      adminController.isEmailExist
   )

   router.post("/v1/api/get-all-schedules-by-doctor", doctorController.getAllSchedules)

   router.post("/v1/api/create-an-appointment", userController.createAppointment)
   router.post("/v1/api/verify-appointment", userController.verifyBookAppointment)

   return app.use("/", router)
}

module.exports = webRoute
