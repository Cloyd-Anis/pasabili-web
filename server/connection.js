const { Sequelize } = require('sequelize');
require('dotenv').config('./.env');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        paranoid: true
    }
});

try{
    sequelize.authenticate();
}catch(err){
    console.log(err);
}

exports.sequelize = sequelize;