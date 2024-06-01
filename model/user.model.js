const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../connection");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.BIGINT,
      //defaultVale: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.TEXT,
    },
    last_name: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
      unique: true,
    },
    gender: {
      type: DataTypes.STRING,
    },
  }
);

module.exports = { User };
