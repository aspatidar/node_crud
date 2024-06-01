const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('crud', 'postgres', 'admin@123', {
  host: 'localhost',
  dialect:  'postgres',
  // logging: (...msg) => console.log("Logging:- ", msg),
});
console.log("connectiopn js");
 connectWithPostgres = async () =>{
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // console.log('Table is created');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = {connectWithPostgres, sequelize};


