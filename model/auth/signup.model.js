const {DataTypes} = require('sequelize');
const { sequelize } = require('../../connection');

const Signup = sequelize.define('signup', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    first_name:{
        type: DataTypes.TEXT
    },
    last_name: {
        type: DataTypes.TEXT
    },
    email:{
        type: DataTypes.TEXT,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password: {
        type: DataTypes.TEXT
    }
})

module.exports = { Signup };