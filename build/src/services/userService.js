"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = _interopRequireDefault(require("lodash"));

var _uuid = require("uuid");

var _models = _interopRequireDefault(require("../models"));

var _emailService = _interopRequireDefault(require("../services/emailService"));

require("dotenv").config();

var buildUrlEmail = function buildUrlEmail(doctorId, token) {
  var result = "".concat(process.env.URL_REACT, "/verify-appointment?token=").concat(token, "&doctorId=").concat(doctorId);
  return result;
};

var getDoctorWithoutAppointment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(specialtyId, dateBooked, timeBooked) {
    var allDoctor, doctorIdArr, newSchedules, doctorIdHadSchedule, differentId, doctorIdRandom, doctorId, checkDuplicateDate, _doctorIdRandom, _doctorId, checkDuplicateTime, _doctorIdRandom2, _doctorId2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].User.findAll({
              where: {
                roleId: "R2",
                specialtyId: specialtyId
              }
            });

          case 2:
            allDoctor = _context.sent;
            doctorIdArr = allDoctor.reduce(function (doctorIds, item) {
              return doctorIds.concat(item.id);
            }, []);
            _context.next = 6;
            return _models["default"].Schedule.findAll({
              where: {
                status: "S1"
              }
            });

          case 6:
            newSchedules = _context.sent;
            doctorIdHadSchedule = newSchedules.reduce(function (doctorIds, item) {
              return doctorIds.concat(item.doctorId);
            }, []); // find list doctor not in doctorIdHadSchedule

            differentId = _lodash["default"].difference(doctorIdArr, doctorIdHadSchedule);

            if (!(differentId.length > 0)) {
              _context.next = 15;
              break;
            }

            doctorIdRandom = Math.floor(Math.random() * differentId.length);
            doctorId = differentId[doctorIdRandom];
            return _context.abrupt("return", doctorId);

          case 15:
            checkDuplicateDate = newSchedules.filter(function (item) {
              return item.dateBooked !== dateBooked;
            });

            if (!(checkDuplicateDate.length > 0)) {
              _context.next = 22;
              break;
            }

            _doctorIdRandom = Math.floor(Math.random() * checkDuplicateDate.length);
            _doctorId = checkDuplicateDate[_doctorIdRandom].doctorId;
            return _context.abrupt("return", _doctorId);

          case 22:
            checkDuplicateTime = newSchedules.filter(function (item) {
              return item.timeBooked !== timeBooked;
            });

            if (!(checkDuplicateTime.length > 0)) {
              _context.next = 29;
              break;
            }

            _doctorIdRandom2 = Math.floor(Math.random() * checkDuplicateTime.length);
            _doctorId2 = checkDuplicateTime[_doctorIdRandom2].doctorId;
            return _context.abrupt("return", _doctorId2);

          case 29:
            return _context.abrupt("return", {
              success: false,
              message: "Please choose another time."
            });

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getDoctorWithoutAppointment(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var createAppointment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve, reject) {
                var token, doctorId, doctorName, time, user, isBooked;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;

                        if (!(!data.email || !data.dateBooked || !data.timeBooked || !data.specialtyId || !data.fullName)) {
                          _context2.next = 5;
                          break;
                        }

                        resolve({
                          success: false,
                          message: "Missing input parameter!"
                        });
                        _context2.next = 36;
                        break;

                      case 5:
                        token = (0, _uuid.v4)(); //find doctor without appointment

                        _context2.next = 8;
                        return getDoctorWithoutAppointment(data.specialtyId, data.dateBooked, data.timeBooked);

                      case 8:
                        doctorId = _context2.sent;
                        _context2.next = 11;
                        return _models["default"].User.findOne({
                          where: {
                            id: doctorId
                          }
                        });

                      case 11:
                        doctorName = _context2.sent;
                        _context2.next = 14;
                        return _models["default"].Role.findOne({
                          where: {
                            keyMap: data.timeBooked
                          }
                        });

                      case 14:
                        time = _context2.sent;
                        _context2.next = 17;
                        return _emailService["default"].sendSimpleEmail({
                          receiverEmail: data.email,
                          patientName: data.fullName,
                          time: time.valueVi,
                          doctorName: doctorName.fullName,
                          language: "vi",
                          redirectLink: buildUrlEmail(doctorId, token)
                        });

                      case 17:
                        _context2.next = 19;
                        return _models["default"].User.findOrCreate({
                          where: {
                            email: data.email
                          },
                          defaults: {
                            email: data.email,
                            roleId: "R3",
                            fullName: data.fullName,
                            phoneNumber: data.phoneNumber
                          }
                        });

                      case 19:
                        user = _context2.sent;
                        _context2.next = 22;
                        return _models["default"].Schedule.findOne({
                          where: {
                            patientId: user[0].id,
                            status: "S1"
                          }
                        });

                      case 22:
                        isBooked = _context2.sent;

                        if (!isBooked) {
                          _context2.next = 28;
                          break;
                        }

                        resolve({
                          success: false,
                          message: "You are already have an appointment. Please check your email"
                        });
                        return _context2.abrupt("return");

                      case 28:
                        if (!(user && user[0])) {
                          _context2.next = 34;
                          break;
                        }

                        _context2.next = 31;
                        return _models["default"].Schedule.create({
                          status: "S1",
                          doctorId: doctorId,
                          patientId: user[0].id,
                          dateBooked: data.dateBooked,
                          timeBooked: time.valueVi,
                          reason: data.reason,
                          token: token
                        });

                      case 31:
                        resolve({
                          success: true,
                          message: "Booking success"
                        });
                        _context2.next = 35;
                        break;

                      case 34:
                        resolve({
                          success: false,
                          message: "Booking fail"
                        });

                      case 35:
                        resolve({
                          success: true,
                          message: "Booking success"
                        });

                      case 36:
                        _context2.next = 42;
                        break;

                      case 38:
                        _context2.prev = 38;
                        _context2.t0 = _context2["catch"](0);
                        console.log("er", _context2.t0);
                        reject(_context2.t0);

                      case 42:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[0, 38]]);
              }));

              return function (_x5, _x6) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createAppointment(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

var verifyBookAppointment = function verifyBookAppointment(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(resolve, reject) {
      var appointment;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;

              if (!(!data.token || !data.doctorId)) {
                _context4.next = 5;
                break;
              }

              resolve({
                success: false,
                message: "Error when trying to verify new appointment"
              });
              _context4.next = 16;
              break;

            case 5:
              _context4.next = 7;
              return _models["default"].Schedule.findOne({
                where: {
                  doctorId: data.doctorId,
                  token: data.token,
                  status: "S1"
                },
                raw: false
              });

            case 7:
              appointment = _context4.sent;

              if (!appointment) {
                _context4.next = 15;
                break;
              }

              appointment.status = "S2";
              _context4.next = 12;
              return appointment.save();

            case 12:
              resolve({
                success: true,
                message: "Update the appointment succeed"
              });
              _context4.next = 16;
              break;

            case 15:
              resolve({
                success: false,
                message: "Schedule has been activated or doest not exist"
              });

            case 16:
              _context4.next = 22;
              break;

            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4["catch"](0);
              console.log("er", _context4.t0);
              reject(_context4.t0);

            case 22:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 18]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};

var getDoctorById = function getDoctorById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve, reject) {
      var data;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].User.findOne({
                where: {
                  id: id
                },
                include: [{
                  model: _models["default"].Doctor_info,
                  as: "doctor_infoData",
                  attributes: ["language", "certificate", "degree", "experience", "member", "field"]
                }],
                nest: true,
                raw: true
              });

            case 3:
              data = _context5.sent;

              if (data && data.length > 0) {
                data.map(function (item) {
                  item.image = Buffer.from(item.image, "base64").toString("binary");
                  item.doctor_infoData.experience = JSON.parse(item.doctor_infoData.experience);
                  item.doctor_infoData.degree = JSON.parse(item.doctor_infoData.degree);
                  item.doctor_infoData.certificate = JSON.parse(item.doctor_infoData.certificate);
                  item.doctor_infoData.member = JSON.parse(item.doctor_infoData.member);
                  item.doctor_infoData.field = JSON.parse(item.doctor_infoData.field);
                });
              }

              resolve({
                success: true,
                data: data
              });
              _context5.next = 11;
              break;

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              reject(_context5.t0);

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 8]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};

var getNewsById = function getNewsById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(resolve, reject) {
      var data;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _models["default"].News.findOne({
                where: {
                  id: id
                }
              });

            case 3:
              data = _context6.sent;

              if (data) {
                data.img = Buffer.from(data.img, "base64").toString("binary");
              }

              resolve({
                success: true,
                data: data
              });
              _context6.next = 11;
              break;

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              reject(_context6.t0);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 8]]);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
};

var createQuestion = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(data) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(resolve, reject) {
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;

                        if (data.email) {
                          _context7.next = 5;
                          break;
                        }

                        resolve({
                          success: false,
                          message: "Missing input parameter!"
                        });
                        _context7.next = 8;
                        break;

                      case 5:
                        _context7.next = 7;
                        return _models["default"].Question.create({
                          email: data.email,
                          phoneNumber: data.phoneNumber,
                          fullName: data.fullName,
                          content: data.reason
                        });

                      case 7:
                        resolve({
                          success: true,
                          message: "Send a question successfully"
                        });

                      case 8:
                        _context7.next = 14;
                        break;

                      case 10:
                        _context7.prev = 10;
                        _context7.t0 = _context7["catch"](0);
                        console.log("er", _context7.t0);
                        reject(_context7.t0);

                      case 14:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7, null, [[0, 10]]);
              }));

              return function (_x14, _x15) {
                return _ref8.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function createQuestion(_x13) {
    return _ref7.apply(this, arguments);
  };
}();

module.exports = {
  createAppointment: createAppointment,
  verifyBookAppointment: verifyBookAppointment,
  getDoctorById: getDoctorById,
  createQuestion: createQuestion,
  getNewsById: getNewsById
};