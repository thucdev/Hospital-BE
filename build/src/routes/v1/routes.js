"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _Authentication = _interopRequireDefault(require("../../controllers/AuthController/Authentication"));

var _checkRole = _interopRequireDefault(require("../../controllers/AuthController/middleware/checkRole"));

var _verifyToken = _interopRequireDefault(require("../../controllers/AuthController/middleware/verifyToken"));

var _adminController = _interopRequireDefault(require("../../controllers/DoctorController/adminController"));

var _doctorController = _interopRequireDefault(require("../../controllers/DoctorController/doctorController"));

var _specialtyController = _interopRequireDefault(require("../../controllers/DoctorController/specialtyController"));

var _userController = _interopRequireDefault(require("../../controllers/UserController/userController"));

var router = _express["default"].Router();

var webRoute = function webRoute(app) {
  router.get("/", function (req, res) {
    res.send("welcome to backend");
  });
  router.post("/v1/api/register", _Authentication["default"].register);
  router.post("/v1/api/login", _Authentication["default"].login);
  router.post("/v1/api/logout", _verifyToken["default"], _Authentication["default"].logout);
  router.get("/v1/api/auth", _verifyToken["default"], _Authentication["default"].checkUserIsLogin); //refresh token

  router.post("/v1/api/refresh", _Authentication["default"].requestRefreshToken);
  router.post("/v1/api/create-new-specialty", _verifyToken["default"], _checkRole["default"].checkAdmin, _specialtyController["default"].createNewSpecialty);
  router.post("/v1/api/create-new-specialty-translation", _verifyToken["default"], _checkRole["default"].checkAdmin, _specialtyController["default"].createNewSpecialtyTranslation);
  router.get("/v1/api/get-all-specialties", _specialtyController["default"].getAllSpecialties);
  router.get("/v1/api/get-specialty-by-id/", _verifyToken["default"], _specialtyController["default"].getSpecialtyById);
  router.put("/v1/api/update-specialty", _verifyToken["default"], _checkRole["default"].checkAdmin, _specialtyController["default"].updateSpecialty);
  router["delete"]("/v1/api/delete-specialty", _verifyToken["default"], _checkRole["default"].checkAdmin, _specialtyController["default"].deleteSpecialty);
  router["delete"]("/v1/api/delete-doctor", _verifyToken["default"], _checkRole["default"].checkAdmin, _adminController["default"].deleteDoctor);
  router.post("/v1/api/create-doctor", _verifyToken["default"], _checkRole["default"].checkAdmin, _adminController["default"].createDoctor);
  router.get("/v1/api/get-doctor-by-id/", _userController["default"].getDoctorById);
  router.get("/v1/api/doctors", _adminController["default"].paginationDoctor);
  router.get("/v1/api/get-all-doctors", _adminController["default"].getAllDoctor);
  router.get("/v1/api/get-all-schedules", _adminController["default"].getAllSchedules);
  router.post("/v1/api/is-email-exist", _checkRole["default"].checkAdmin, _adminController["default"].isEmailExist);
  router.post("/v1/api/get-all-schedules-by-doctor", _doctorController["default"].getAllSchedules);
  router.post("/v1/api/create-an-appointment", _userController["default"].createAppointment);
  router.post("/v1/api/verify-appointment", _userController["default"].verifyBookAppointment);
  router.post("/v1/api/create-question", _userController["default"].createQuestion);
  router.post("/v1/api/create-news", _verifyToken["default"], _checkRole["default"].checkAdmin, _doctorController["default"].createNews);
  router.get("/v1/api/news", _doctorController["default"].getNews);
  router.get("/v1/api/get-news-by-id/", _userController["default"].getNewsById);
  return app.use("/", router);
};

module.exports = webRoute;