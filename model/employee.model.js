const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../connection");

const Employee = sequelize.define("employee", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.TEXT,
    unique: true,
    get() {
      const rawValue = this.getDataValue("first_name");
      return rawValue ? rawValue.toUpperCase() : null;
    },
  },
  last_name: {
    type: DataTypes.TEXT,
  },
  designation: {
    type: DataTypes.TEXT,
  },
  group: {
    type: DataTypes.TEXT,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    unique: true,
  },
});

module.exports = { Employee };
