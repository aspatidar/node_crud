const { DataTypes } = require("sequelize");
const { sequelize } = require("../../connection");
const bcrypt = require("bcrypt");

const Signup = sequelize.define(
  "signup",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
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
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.TEXT,
    },
    token: {
      type: DataTypes.TEXT,
    },
  },
  {
    hooks: {
      beforeCreate: async (Signup) => {
        const salt = await bcrypt.genSaltSync(10);
        Signup.password = bcrypt.hashSync(Signup.password, salt);
      },
    },
  }
);

module.exports = { Signup };
