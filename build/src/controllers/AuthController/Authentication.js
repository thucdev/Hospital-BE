"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../../models/index"));

require("dotenv").config();

var refreshTokens = []; // binh thuong se luu vao redis cho khoi bi trung lap

var checkUserIsLogin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _index["default"].User.findOne({
              where: {
                id: req.user.id
              }
            });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              success: false,
              message: "User not found"
            }));

          case 6:
            return _context.abrupt("return", res.json({
              success: true,
              user: user
            }));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log("e", _context.t0);
            return _context.abrupt("return", res.status(500).json({
              success: false,
              message: "Internal error server"
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function checkUserIsLogin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var register = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, email, password, user, salt, hashPW, newUser;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;

            if (!(!email || !password)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              success: false,
              message: "Missing email or password"
            }));

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return _index["default"].User.findOne({
              where: {
                email: req.body.email
              },
              raw: true
            });

          case 6:
            user = _context2.sent;

            if (!user) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              success: false,
              message: "Email is already exist."
            }));

          case 9:
            salt = _bcrypt["default"].genSaltSync(10);
            hashPW = _bcrypt["default"].hashSync(req.body.password, salt);
            _context2.next = 13;
            return _index["default"].User.create({
              email: req.body.email,
              password: hashPW,
              roleId: "R3"
            });

          case 13:
            newUser = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              success: true,
              message: "Create user successfully"
            }));

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](3);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              success: false,
              message: "Error from server create new user"
            }));

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 17]]);
  }));

  return function register(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}(); // create access token


var generateAccessToken = function generateAccessToken(data) {
  var accessToken = _jsonwebtoken["default"].sign({
    id: data.id,
    roleId: data.roleId
  }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "10m"
  });

  return accessToken;
};

var generateRefreshToken = function generateRefreshToken(data) {
  var refreshToken = _jsonwebtoken["default"].sign({
    id: data.id,
    roleId: data.roleId
  }, process.env.JWT_REFRESH_KEY, {
    expiresIn: "30d"
  });

  return refreshToken;
};

var login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body2, email, password, user, validPassword, accessToken, refreshToken;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

            if (!(!email || !password)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              success: false,
              message: "Missing email or password"
            }));

          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return _index["default"].User.findOne({
              where: {
                email: req.body.email
              },
              raw: true
            });

          case 6:
            user = _context3.sent;

            if (user) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              success: false,
              message: "Wrong username or password!"
            }));

          case 9:
            _context3.next = 11;
            return _bcrypt["default"].compare(req.body.password, user.password);

          case 11:
            validPassword = _context3.sent;

            if (validPassword) {
              _context3.next = 14;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              success: false,
              message: "Wrong username or password!"
            }));

          case 14:
            if (!(user && validPassword)) {
              _context3.next = 20;
              break;
            }

            accessToken = generateAccessToken(user);
            refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            delete user.password;
            return _context3.abrupt("return", res.status(200).json({
              accessToken: accessToken,
              refreshToken: refreshToken,
              success: true,
              userId: user.id,
              roleId: user.roleId
            }));

          case 20:
            _context3.next = 25;
            break;

          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](3);
            console.log("err", _context3.t0);

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 22]]);
  }));

  return function login(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var requestRefreshToken = function requestRefreshToken(req, res) {
  var refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "You are not authenticated!"
    });
  }

  if (!refreshToken.includes(refreshTokens)) {
    return res.status(401).json({
      success: false,
      message: "Token is not invalid"
    });
  }

  _jsonwebtoken["default"].verify(refreshToken, process.env.JWT_REFRESH_KEY, function (err, user) {
    if (err) {
      console.log("err", err);
    }

    refreshTokens = refreshTokens.filter(function (token) {
      return token !== refreshToken;
    });
    var newAccessToken = generateAccessToken(user);
    var newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);
    return res.status(200).json({
      success: true,
      newAccessToken: newAccessToken,
      newRefreshToken: newRefreshToken
    });
  });
};

var logout = function logout(req, res) {
  // res.clearCookie("refreshToken")
  refreshTokens = refreshTokens.filter(function (token) {
    return token !== req.body.refreshToken;
  });
  return res.status(200).json({
    success: true,
    message: "Logout successfully"
  });
};

module.exports = {
  register: register,
  login: login,
  logout: logout,
  requestRefreshToken: requestRefreshToken,
  checkUserIsLogin: checkUserIsLogin
};