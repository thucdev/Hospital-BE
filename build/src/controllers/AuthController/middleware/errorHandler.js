"use strict";

var errorHandler = function errorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500; //Duplication

  if (err.code === 11000) {
    err.statusCode = 400;

    for (var p in err.keyValue) {
      err.message = "".concat(p, " have to be unique");
    }
  } //ObjectId not found


  if (err.kind === "ObjectId") {
    err.statusCode = 400;
    err.message = "The ".concat(req.originalUrl, " is not found because wrong id");
  } //validation


  if (err.errors) {
    err.statusCode = 400;
    err.message = [];

    for (var _p in err.errors) {
      err.message.push(err.errors[_p].properties.message);
    }
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};

module.exports = {
  errorHandler: errorHandler
};