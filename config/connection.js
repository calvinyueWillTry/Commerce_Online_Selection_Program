require('dotenv').config();
//create and refer to .env file for its info
const Sequelize = require('sequelize');//install by itself?

//gather this info from .env each time through Heroku the code is run 
//(doesn't need its own port id?)
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });
//keyword to modularize this file for use (on server.js)
module.exports = sequelize;
