"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

require("dotenv").config();

var sendSimpleEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(dataSend) {
    var transporter, info;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transporter = _nodemailer["default"].createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false,
              // true for 465, false for other ports
              auth: {
                user: process.env.EMAIL_APP,
                // generated ethereal user
                pass: process.env.PASSWORD_EMAIL_APP // generated ethereal password

              },
              tls: {
                rejectUnauthorized: false
              }
            }); // send mail with defined transport object

            _context.next = 3;
            return transporter.sendMail({
              from: '"Thucidol 👻" <thucidol2012@gmail.com>',
              // sender address
              to: dataSend.receiverEmail,
              // list of receiverEmail
              subject: "Thông tin đặt lịch khám bệnh",
              // Subject line
              html: getBodyHTMLEmail(dataSend)
            });

          case 3:
            info = _context.sent;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendSimpleEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getBodyHTMLEmail = function getBodyHTMLEmail(dataSend) {
  var result = "";

  if (dataSend.language === "vi") {
    result = " <h3> Xin ch\xE0o ".concat(dataSend.patientName, "!</h3>\n    <p>B\u1EA1n nh\u1EADn \u0111\u01B0\u1EE3c email n\xE0y v\xEC \u0111\xE3 \u0111\u1EB7t l\u1ECBch kh\xE1m b\u1EC7nh online tr\xEAn thucDo.developer</p>\n        <p>Th\xF4ng tin \u0111\u1EB7t l\u1ECBch kh\xE1m b\u1EC7nh</p>\n        <div><b>Th\u1EDDi gian ").concat(dataSend.time, "</b></div>\n        <div><b>B\xE1c s\u0129 ").concat(dataSend.doctorName, "</b></div>\n\n        <p>N\u1EBFu c\xE1c th\xF4ng tin tr\xEAn l\xE0 \u0111\xFAng vui l\xF2ng click v\xE0o \u0111\u01B0\u1EDDng link b\xEAn d\u01B0\u1EDBi \u0111\u1EC3 x\xE1c nh\u1EADn\n        v\xE0 ho\xE0n t\u1EA5t th\u1EE7 t\u1EE5c \u0111\u1EB7t l\u1ECBch kh\xE1m b\u1EC7nh\n        </p>\n        <div><a href=").concat(dataSend.redirectLink, " target='_blank'>Click here</a></div>\n\n        <div>Xin ch\xE2n th\xE0nh c\u1EA3m \u01A1n!</div>");
  }

  if (dataSend.language === "en") {
    result = "\n         <h3> Dear ".concat(dataSend.patientName, "!</h3>\n    <p>You received this email because you booked an online medical appointment on thucidol.com</p>\n        <p>Information to book a medical appointment</p>\n        <div><b>Time ").concat(dataSend.time, "</b></div>\n        <div><b>Doctor ").concat(dataSend.doctorName, "</b></div>\n\n        <p>If the above information is true, please click on the link below to confirm and complete the procedure to schedule an appointment.\n        </p>\n        <div><a href=").concat(dataSend.redirectLink, " target='_blank'>Click here</a></div>\n\n        <div>Sincerely thank!</div>\n        ");
  }

  return result;
};

var getBodyHTMLEmailRemedy = function getBodyHTMLEmailRemedy(dataSend) {
  var result = "";

  if (dataSend.language === "vi") {
    result = " <h3> Xin ch\xE0o ".concat(dataSend.patientName, "!</h3>\n    <p>B\u1EA1n nh\u1EADn \u0111\u01B0\u1EE3c email n\xE0y v\xEC \u0111\xE3 \u0111\u1EB7t l\u1ECBch kh\xE1m b\u1EC7nh online tr\xEAn thucidol.com th\xE0nh c\xF4ng</p>\n        <p>Th\xF4ng tin \u0111\u1EB7t l\u1ECBch kh\xE1m b\u1EC7nh \u0111\u01B0\u1EE3c g\u1EEDi trong file \u0111\xEDnh k\xE8m</p>\n\n\n        <p>N\u1EBFu c\xE1c th\xF4ng tin tr\xEAn l\xE0 \u0111\xFAng s\u1EF1 th\u1EADt vui l\xF2ng click v\xE0o \u0111\u01B0\u1EDDng link b\xEAn d\u01B0\u1EDBi \u0111\u1EC3 x\xE1c nh\u1EADn\n        v\xE0 ho\xE0n t\u1EA5t th\u1EE7 t\u1EE5c \u0111\u1EB7t l\u1ECBch kh\xE1m b\u1EC7nh\n        </p>\n        <div><a href=").concat(dataSend.redirectLink, " target='_blank'>Click here</a></div>\n\n        <div>Xin ch\xE2n th\xE0nh c\u1EA3m \u01A1n!</div>");
  }

  if (dataSend.language === "en") {
    result = "\n         <h3> Dear  ".concat(dataSend.patientName, " !</h3>\n    <p>You received this email because you booked an online medical appointment on thucidol.com successfully</p>\n        <p>Information to book a medical appointment</p>\n\n\n        <p>If the above information is true, please click on the link below to confirm and complete the procedure to schedule an appointment.\n        </p>\n        <div><a href=").concat(dataSend.redirectLink, " target='_blank'>Click here</a></div>\n\n        <div>Sincerely thank!</div>\n        ");
  }

  return result;
};

var sendAttachment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(dataSend) {
    var transporter, info;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            transporter = _nodemailer["default"].createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false,
              // true for 465, false for other ports
              auth: {
                user: process.env.EMAIL_APP,
                // generated ethereal user
                pass: process.env.PASSWORD_EMAIL_APP // generated ethereal password

              }
            }); // send mail with defined transport object

            _context2.next = 3;
            return transporter.sendMail({
              from: '"Thucidol 👻👻 " <thucidol2012@gmail.com>',
              // sender address
              to: dataSend.email,
              // list of receiverEmail
              subject: "Kết quả đặt lịch khám bệnh",
              // Subject line
              html: getBodyHTMLEmailRemedy(dataSend),
              attachments: [{
                filename: "remedy-".concat(dataSend.patientId, "-").concat(new Date().getTime(), ".png"),
                content: dataSend.imgBase64.split("base64")[1],
                encoding: "base64"
              }]
            });

          case 3:
            info = _context2.sent;

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function sendAttachment(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment
};