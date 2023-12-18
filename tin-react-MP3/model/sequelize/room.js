const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Room = sequelize.define('Room', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
   roomType: {
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
   roomNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
         notEmpty: {
             msg: "general.validation_errors.required"
         },
     }
 },
   utility: {
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
});

module.exports = Room;