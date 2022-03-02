"use strict";

var checkAdmin = function checkAdmin(req, res, next) {
  var role = req.user.roleId;

  if (role === "R1") {
    next();
  } else {
    return res.status(500).json({
      success: false,
      message: "Not permission"
    });
  }
};

var checkDoctor = function checkDoctor(req, res, next) {
  var role = req.user.roleId;

  if (role === "R2" || role === "R1") {
    next();
  } else {
    return res.status(500).json({
      success: false,
      message: "Not permission"
    });
  }
};

var checkPatient = function checkPatient(req, res, next) {
  var role = req.user.roleId;

  if (role === "R3" || role === "R2" || role === "R1") {
    next();
  } else {
    return res.status(500).json({
      success: false,
      message: "Not permission"
    });
  }
};

module.exports = {
  checkAdmin: checkAdmin,
  checkDoctor: checkDoctor,
  checkPatient: checkPatient
};