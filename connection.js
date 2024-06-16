const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  "crud",
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    // logging: (...msg) => console.log("Logging:- ", msg),
  }
);
console.log("connectiopn js");
connectWithPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // console.log('Table is created');
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connectWithPostgres, sequelize };
