"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _connectDB = _interopRequireDefault(require("./config/connectDB"));

var _errorHandler = require("./controllers/AuthController/middleware/errorHandler");

var _routes = _interopRequireDefault(require("./routes/v1/routes.js"));

var cookieParser = require("cookie-parser");

require("dotenv").config();

var app = (0, _express["default"])();
app.use(cookieParser());
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use((0, _cors["default"])(corsOptions));
(0, _connectDB["default"])();
var hostname = "localhost";
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(_express["default"].json({
  limit: "80mb"
}));
app.use(_express["default"].urlencoded({
  limit: "80mb",
  extended: true,
  parameterLimit: 50000
}));
(0, _routes["default"])(app); //unhandle route

app.all("*", function (req, res, next) {
  var err = new Error("The route can not be found");
  err.statusCode = 404;
  next(err);
});
app.use(_errorHandler.errorHandler);
app.listen(process.env.PORT || 8080, function () {
  console.log("Hello Thucidol, I am running at ".concat(process.env.PORT, "/"));
});