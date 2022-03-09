const { Sequelize } = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
   dialectOptions: {
      ssl: {
         require: true,
         rejectUnauthorized: false,
      },
   },
})

let connectDB = async () => {
   try {
      await sequelize.authenticate()
      console.log("Connection has been established successfully.")
   } catch (error) {
      console.error("Unable to connect to the database:", error)
   }
}

module.exports = connectDB
