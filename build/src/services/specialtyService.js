"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var createNewSpecialty = function createNewSpecialty(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
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
              _context.next = 8;
              break;

            case 5:
              _context.next = 7;
              return _models["default"].Specialty.create({
                title: data.title,
                img: data.img,
                descriptionHTML: data.descriptionHTML,
                descriptionMarkdown: data.descriptionMarkdown
              });

            case 7:
              resolve({
                success: true,
                message: "Create Successfully"
              });

            case 8:
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 10]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var createNewSpecialtyTranslation = function createNewSpecialtyTranslation(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve, reject) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              if (data) {
                _context2.next = 5;
                break;
              }

              resolve({
                success: false,
                message: "Missing input parameter!"
              });
              _context2.next = 8;
              break;

            case 5:
              _context2.next = 7;
              return _models["default"].specialty_translation.findOrCreate({
                where: {
                  specialtyId: data.specialtyId
                },
                defaults: {
                  specialtyId: data.specialtyId,
                  title: data.title,
                  descriptionHTML: data.descriptionHTML,
                  descriptionMarkdown: data.descriptionMarkdown,
                  langCode: data.code
                }
              });

            case 7:
              resolve({
                success: true,
                message: "Translate successfully"
              });

            case 8:
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              reject(_context2.t0);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 10]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var getAllSpecialties = function getAllSpecialties() {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve, reject) {
      var data;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].Specialty.findAll({
                include: [{
                  model: _models["default"].specialty_translation,
                  as: "translationData",
                  attributes: ["descriptionHTML", "descriptionMarkdown", "title", "langCode", "updatedAt"]
                }],
                nest: true,
                raw: true
              });

            case 3:
              data = _context3.sent;

              if (data && data.length > 0) {
                data.map(function (item) {
                  item.img = Buffer.from(item.img, "base64").toString("binary");
                });
              }

              resolve({
                success: true,
                data: data
              });
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              reject(_context3.t0);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 8]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};

var getSpecialtyById = function getSpecialtyById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(resolve, reject) {
      var data;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].Specialty.findOne({
                where: {
                  id: id
                },
                include: [{
                  model: _models["default"].specialty_translation,
                  as: "translationData",
                  attributes: ["descriptionHTML", "descriptionMarkdown", "title", "langCode"]
                }],
                nest: true,
                raw: true
              });

            case 3:
              data = _context4.sent;

              if (data) {
                data.img = Buffer.from(data.img, "base64").toString("binary");
              }

              resolve({
                success: true,
                data: data
              });
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              reject(_context4.t0);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 8]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};

var updateSpecialty = function updateSpecialty(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve, reject) {
      var specialtyData, specialtyTranslation, _specialtyData;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.log("data", data);
              _context5.prev = 1;

              if (!(!data || !data.code)) {
                _context5.next = 6;
                break;
              }

              resolve({
                success: false,
                message: "Missing input parameter!"
              });
              _context5.next = 38;
              break;

            case 6:
              if (!(data.code === "vn")) {
                _context5.next = 20;
                break;
              }

              _context5.next = 9;
              return _models["default"].Specialty.findOne({
                where: {
                  id: data.specialtyId
                },
                raw: false
              });

            case 9:
              specialtyData = _context5.sent;

              if (!specialtyData) {
                _context5.next = 17;
                break;
              }

              specialtyData.img = data.imgBase64;
              specialtyData.title = data.title;
              specialtyData.descriptionHTML = data.descriptionHTML;
              specialtyData.descriptionMarkdown = data.descriptionMarkdown;
              _context5.next = 17;
              return specialtyData.save();

            case 17:
              resolve({
                success: true,
                message: "Update to specialty table successfully!"
              });
              _context5.next = 38;
              break;

            case 20:
              _context5.next = 22;
              return _models["default"].Specialty.findOne({
                where: {
                  id: data.specialtyId
                },
                raw: false
              });

            case 22:
              specialtyTranslation = _context5.sent;

              if (!specialtyTranslation) {
                _context5.next = 29;
                break;
              }

              specialtyTranslation.title = data.title;
              specialtyTranslation.descriptionHTML = data.descriptionHTML;
              specialtyTranslation.descriptionMarkdown = data.descriptionMarkdown;
              _context5.next = 29;
              return specialtyTranslation.save();

            case 29:
              if (!data.imgBase64) {
                _context5.next = 37;
                break;
              }

              _context5.next = 32;
              return _models["default"].Specialty.findOne({
                where: {
                  id: data.specialtyId
                },
                raw: false
              });

            case 32:
              _specialtyData = _context5.sent;

              if (!_specialtyData) {
                _context5.next = 37;
                break;
              }

              _specialtyData.img = data.imgBase64;
              _context5.next = 37;
              return _specialtyData.save();

            case 37:
              resolve({
                success: true,
                message: "Update to specialty translation table successfully!"
              });

            case 38:
              _context5.next = 43;
              break;

            case 40:
              _context5.prev = 40;
              _context5.t0 = _context5["catch"](1);
              reject(_context5.t0);

            case 43:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 40]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};

var deleteSpecialty = function deleteSpecialty(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(resolve, reject) {
      var specialty, specialtyTranslation;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _models["default"].Specialty.findOne({
                where: {
                  id: id
                }
              });

            case 3:
              specialty = _context6.sent;
              _context6.next = 6;
              return _models["default"].specialty_translation.findOne({
                where: {
                  specialtyId: id
                }
              });

            case 6:
              specialtyTranslation = _context6.sent;

              if (!(specialty || specialtyTranslation)) {
                _context6.next = 15;
                break;
              }

              _context6.next = 10;
              return _models["default"].Specialty.destroy({
                where: {
                  id: id
                }
              });

            case 10:
              _context6.next = 12;
              return _models["default"].specialty_translation.findOne({
                where: {
                  specialtyId: id
                }
              });

            case 12:
              resolve({
                success: true,
                message: "Delete specialty success"
              });
              _context6.next = 16;
              break;

            case 15:
              resolve({
                success: false,
                message: "Delete specialty fail"
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
  createNewSpecialty: createNewSpecialty,
  getAllSpecialties: getAllSpecialties,
  getSpecialtyById: getSpecialtyById,
  createNewSpecialtyTranslation: createNewSpecialtyTranslation,
  updateSpecialty: updateSpecialty,
  deleteSpecialty: deleteSpecialty
};