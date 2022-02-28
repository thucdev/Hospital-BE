const checkAdmin = (req, res, next) => {
   const role = req.user.roleId
   if (role === "R1") {
      next()
   } else {
      return res.status(500).json({ success: false, message: "Not permission" })
   }
}

const checkDoctor = (req, res, next) => {
   const role = req.user.roleId
   if (role === "R2" || role === "R1") {
      next()
   } else {
      return res.status(500).json({ success: false, message: "Not permission" })
   }
}

const checkPatient = (req, res, next) => {
   const role = req.user.roleId
   if (role === "R3" || role === "R2" || role === "R1") {
      next()
   } else {
      return res.status(500).json({ success: false, message: "Not permission" })
   }
}

module.exports = { checkAdmin, checkDoctor, checkPatient }
