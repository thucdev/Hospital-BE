"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("dotenv").config();

var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, authHeader, accessToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.headers.authorization;
            authHeader = req.header("Authorization");
            console.log("req.header", authHeader);

            if (!token) {
              _context.next = 11;
              break;
            }

            accessToken = token.split(" ")[1];
            _context.next = 8;
            return _jsonwebtoken["default"].verify(accessToken, process.env.JWT_ACCESS_KEY, function (err, user) {
              if (err) {
                return res.json({
                  success: false,
                  message: "Token is not valid"
                });
              }

              req.user = user;
            });

          case 8:
            next();
            _context.next = 12;
            break;

          case 11:
            return _context.abrupt("return", res.json({
              success: false,
              message: "You are not authenticated"
            }));

          case 12:
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.log("", _context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // const verifyToken = (req, res, next) => {
//    const authHeader = req.header("Authorization")
//    const token1 = req.headers.authorization
//    //       console.log("req.headers", req.headers)
//    console.log("req.header", authHeader)
//    console.log("req.header1", token)
//    //work
//    console.log("req.header1", req.headers)
//    const token = authHeader && authHeader.split(" ")[1]
//    if (!token) return res.status(401).json({ success: false, message: "Access token not found" })
//    try {
//       const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//       req.userId = decoded.userId
//       next()
//    } catch (error) {
//       console.log(error)
//       return res.status(403).json({ success: false, message: "Invalid token" })
//    }
// }
// module.exports = verifyToken


module.exports = verifyToken;