"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var getAllSchedules = function getAllSchedules(doctorId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
      var data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].Schedule.findAll({
                where: {
                  status: "S2",
                  doctorId: doctorId
                },
                include: [{
                  model: _models["default"].User,
                  as: "patientData",
                  attributes: ["fullName", "phoneNumber"]
                }],
                nest: true,
                raw: true
              });

            case 3:
              data = _context.sent;
              resolve({
                success: true,
                data: data
              });
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var createNews = function createNews(data) {
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
              return _models["default"].News.create({
                title: data.title,
                img: data.img,
                descriptionHTML: data.descriptionHTML,
                descriptionMarkdown: data.descriptionMarkdown
              });

            case 7:
              resolve({
                success: true,
                message: "Create News Successfully"
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

var getNews = function getNews(data) {
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
              return _models["default"].News.findAndCountAll({
                limit: size,
                offset: pageNumber * size
              });

            case 14:
              res = _context3.sent;

              if (res && res.rows.length > 0) {
                res.rows.map(function (item) {
                  item.img = Buffer.from(item.img, "base64").toString("binary");
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

module.exports = {
  getAllSchedules: getAllSchedules,
  createNews: createNews,
  getNews: getNews
};