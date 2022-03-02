"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _doctorService = _interopRequireDefault(require("../../services/doctorService"));

var getAllSchedules = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var info;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _doctorService["default"].getAllSchedules(req.body.doctorId);

          case 3:
            info = _context.sent;
            return _context.abrupt("return", res.status(200).json(info));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(200).json({
              success: false,
              message: "Error when trying to get all specialties"
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getAllSchedules(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createNews = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var info;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _doctorService["default"].createNews(req.body);

          case 3:
            info = _context2.sent;
            return _context2.abrupt("return", res.status(200).json(info));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(200).json({
              success: false,
              message: "Error when trying to create news"
            }));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function createNews(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getNews = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var info;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _doctorService["default"].getNews(req.query);

          case 3:
            info = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(info));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(200).json({
              success: false,
              message: "Error when trying to get news"
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function getNews(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  getAllSchedules: getAllSchedules,
  createNews: createNews,
  getNews: getNews
};