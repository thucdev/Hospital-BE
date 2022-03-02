const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
   "d1ahi64b3666le",
   "rzhbtwtouqycum",
   "bb8205cf35f743639b04ff91b4b53e3c65997dc2a937d10a1d447c6f4256e561",
   {
      host: "ec2-3-225-79-57.compute-1.amazonaws.com",
      dialect: "postgres",
      logging: false,
      // define: {
      //    timestamps: false,
      // },
      dialectOptions: {
         ssl: {
            require: true,
            rejectUnauthorized: false,
         },
      },
   }
)

let connectDB = async () => {
   try {
      await sequelize.authenticate()
      console.log("Connection has been established successfully.")
   } catch (error) {
      console.error("Unable to connect to the database:", error)
   }
}

module.exports = connectDB
