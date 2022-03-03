"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _models = _interopRequireDefault(require("../models"));

var salt = 10;

var createDoctor = function createDoctor(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
      var isEmail, hashPW, doctor, res;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (data) {
                _context.next = 5;
                break;
              }

              resolve({
                success: false,
                message: "Missing input parameter!"
              });
              _context.next = 29;
              break;

            case 5:
              _context.next = 7;
              return _models["default"].User.findOne({
                where: {
                  email: data.email
                }
              });

            case 7:
              isEmail = _context.sent;

              if (!isEmail) {
                _context.next = 12;
                break;
              }

              resolve({
                success: false,
                message: "Email is already exist!"
              });
              _context.next = 28;
              break;

            case 12:
              _context.next = 14;
              return hashUserPassword(data.password);

            case 14:
              hashPW = _context.sent;
              _context.next = 17;
              return _models["default"].User.findOrCreate({
                where: {
                  email: data.email
                },
                defaults: {
                  email: data.email,
                  password: hashPW,
                  fullName: data.fullName,
                  address: data.address,
                  phoneNumber: data.phoneNumber,
                  roleId: "R2",
                  image: data.image,
                  specialtyId: data.specialtyId
                }
              });

            case 17:
              doctor = _context.sent;

              if (!doctor) {
                _context.next = 27;
                break;
              }

              _context.next = 21;
              return _models["default"].User.findOne({
                where: {
                  email: data.email
                }
              });

            case 21:
              res = _context.sent;

              if (!res) {
                _context.next = 25;
                break;
              }

              _context.next = 25;
              return _models["default"].Doctor_info.create({
                doctorId: res.id,
                language: data.language,
                certificate: data.certificate,
                degree: data.degree,
                experience: data.experience,
                member: data.member,
                field: data.field
              });

            case 25:
              _context.next = 28;
              break;

            case 27:
              resolve({
                success: false,
                message: "Create fail"
              });

            case 28:
              resolve({
                success: true,
                message: "Oke"
              });

            case 29:
              _context.next = 34;
              break;

            case 31:
              _context.prev = 31;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 34:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 31]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var hashUserPassword = function hashUserPassword(password) {
  return new Promise(function (resolve, reject) {
    try {
      var hashPassword = _bcrypt["default"].hashSync(password, salt);

      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

var getAllDoctor = function getAllDoctor() {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve, reject) {
      var res;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _models["default"].User.findAll({
                where: {
                  roleId: "R2"
                },
                include: [{
                  model: _models["default"].Doctor_info,
                  as: "doctor_infoData",
                  attributes: ["language", "certificate", "degree", "experience", "member", "field"]
                }],
                attributes: {
                  exclude: ["password"]
                },
                nest: true,
                raw: true
              });

            case 3:
              res = _context2.sent;
              resolve({
                success: true,
                data: res
              });
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              reject(_context2.t0);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var paginationDoctor = function paginationDoctor(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve, reject) {
      var page, limit, pageAsNumber, sizeAsNumber, pageNumber, size, res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              page = data.page, limit = data.limit;

              if (data) {
                _context3.next = 6;
                break;
              }

              resolve({
                success: false,
                message: "Missing input parameter!"
              });
              _context3.next = 17;
              break;

            case 6:
              pageAsNumber = Number.parseInt(page);
              sizeAsNumber = Number.parseInt(limit);
              pageNumber = 0;

              if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
                pageNumber = pageAsNumber;
              }

              size = 6;

              if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 7) {
                size = sizeAsNumber;
              } // const skipItems = (pageNumber -1) * size


              _context3.next = 14;
              return _models["default"].User.findAndCountAll({
                where: {
                  roleId: "R2"
                },
                offset: pageNumber * size,
                limit: size
              });

            case 14:
              res = _context3.sent;

              if (res) {
                res.rows.map(function (item) {
                  item.image = Buffer.from(item.image, "base64").toString("binary");
                });
              }

              resolve({
                success: true,
                data: res.rows,
                totalPages: Math.ceil(res.count / size),
                total: res.count
              });

            case 17:
              _context3.next = 22;
              break;

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](0);
              reject(_context3.t0);

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 19]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};

var getAllSchedules = function getAllSchedules() {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(resolve, reject) {
      var data;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].Schedule.findAll({
                where: {
                  status: "S2"
                },
                include: [{
                  model: _models["default"].User,
                  as: "doctorData",
                  attributes: ["fullName"]
                }, {
                  model: _models["default"].User,
                  as: "patientData",
                  attributes: ["fullName", "phoneNumber"]
                }],
                nest: true,
                raw: true
              });

            case 3:
              data = _context4.sent;
              resolve({
                success: true,
                data: data
              });
              _context4.next = 10;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              reject(_context4.t0);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 7]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};

var isEmailExist = function isEmailExist(email) {
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
                  email: email
                }
              });

            case 3:
              data = _context5.sent;

              if (data) {
                resolve({
                  success: true,
                  message: "Email is already exist!"
                });
              } else {
                resolve({
                  success: false,
                  message: "Email is not exist!"
                });
              }

              _context5.next = 10;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              reject(_context5.t0);

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 7]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};

var deleteDoctor = function deleteDoctor(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(resolve, reject) {
      var doctor, doctorInfo;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _models["default"].Doctor.findOne({
                where: {
                  id: id
                }
              });

            case 3:
              doctor = _context6.sent;
              _context6.next = 6;
              return _models["default"].Doctor_info.findOne({
                where: {
                  doctorId: id
                }
              });

            case 6:
              doctorInfo = _context6.sent;

              if (!(doctor && doctorInfo)) {
                _context6.next = 15;
                break;
              }

              _context6.next = 10;
              return _models["default"].Doctor.destroy({
                where: {
                  id: id
                }
              });

            case 10:
              _context6.next = 12;
              return _models["default"].Doctor_info.findOne({
                where: {
                  specialtyId: id
                }
              });

            case 12:
              resolve({
                success: true,
                message: "Delete doctor success"
              });
              _context6.next = 16;
              break;

            case 15:
              resolve({
                success: false,
                message: "Delete doctor fail"
              });

            case 16:
              _context6.next = 21;
              break;

            case 18:
              _context6.prev = 18;
              _context6.t0 = _context6["catch"](0);
              reject(_context6.t0);

            case 21:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 18]]);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
};

module.exports = {
  createDoctor: createDoctor,
  getAllDoctor: getAllDoctor,
  getAllSchedules: getAllSchedules,
  isEmailExist: isEmailExist,
  paginationDoctor: paginationDoctor,
  deleteDoctor: deleteDoctor
};