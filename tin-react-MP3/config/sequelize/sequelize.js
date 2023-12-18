const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin', 'root', 'root', {
    dialect: 'mysql', 
    host: 'localhost',
    port: '5001'
});

module.exports = sequelize;