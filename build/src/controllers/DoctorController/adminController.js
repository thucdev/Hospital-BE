"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _adminService = _interopRequireDefault(require("../../services/adminService"));

var createDoctor = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var info;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _adminService["default"].createDoctor(req.body);

          case 3:
            info = _context.sent;
            return _context.abrupt("return", res.status(200).json(info));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(200).json({
              success: false,
              message: "Error when trying to create new specialty"
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function createDoctor(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getAllDoctor = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var info;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _adminService["default"].getAllDoctor();

          case 3:
            info = _context2.sent;
            return _context2.abrupt("return", res.status(200).json(info));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(200).json({
              success: false,
              message: "Error when trying to get all Doctors"
            }));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getAllDoctor(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getAllSchedules = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var info;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _adminService["default"].getAllSchedules();

          case 3:
            info = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(info));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(200).json({
              success: false,
              message: "Error when trying to create new specialty"
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function getAllSchedules(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var isEmailExist = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var info;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _adminService["default"].isEmailExist(req.body.email);

          case 3:
            info = _context4.sent;
            return _context4.abrupt("return", res.status(200).json(info));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(200).json({
              success: false,
              message: "Error when trying to check email"
            }));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function isEmailExist(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var paginationDoctor = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var info;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _adminService["default"].paginationDoctor(req.query);

          case 3:
            info = _context5.sent;
            return _context5.abrupt("return", res.status(200).json(info));

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(200).json({
              success: false,
              message: "Error when trying to get news"
            }));

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function paginationDoctor(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var deleteDoctor = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var info;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _adminService["default"].paginationDoctor(req.query.id);

          case 3:
            info = _context6.sent;
            return _context6.abrupt("return", res.status(200).json(info));

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(200).json({
              success: false,
              message: "Error when trying to get news"
            }));

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function deleteDoctor(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

module.exports = {
  createDoctor: createDoctor,
  getAllDoctor: getAllDoctor,
  getAllSchedules: getAllSchedules,
  isEmailExist: isEmailExist,
  paginationDoctor: paginationDoctor,
  deleteDoctor: deleteDoctor
};