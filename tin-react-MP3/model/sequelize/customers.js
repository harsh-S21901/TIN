const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Customer = sequelize.define('Customers', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
   name: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           notEmpty: {
               msg: "general.validation_errors.required"
           },
           len: {
               args: [3, 60],
               msg: "general.validation_errors.min"
           },
       }
   },
   surname: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           notEmpty: {
               msg: "general.validation_errors.required"
           },
           len: {
               args: [3, 60],
               msg: "general.validation_errors.min"
           },
       }
   },
   email: {
       type: Sequelize.STRING,
       allowNull: true,
       unique: true,
       validate: {
           len: {
            args: [3,60],
               msg: "general.validation_errors.email"
           },
       }
   },
   password: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
            notEmpty:{
                msg:"general.validation_errors.required"
            }
        }
   }
});

module.exports = Customer;