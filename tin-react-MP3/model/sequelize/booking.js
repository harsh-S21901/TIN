const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Booking = sequelize.define('Booking', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
   dateFrom: {
       type: Sequelize.DATE,
       allowNull: false,
       validate: {
            notEmpty: {
                msg: "general.validation_errors.required"
            },
       }
   },
   dateTo: {
       type: Sequelize.DATE,
       allowNull: true,validate: {
        notEmpty: {
            msg: "general.validation_errors.required"
        },
   }
   },
   customerId: {
       type: Sequelize.INTEGER,
       allowNull: false,
       validate: {
            notEmpty: {
                msg: "general.validation_errors.required"
            },
       }
   },
   roomId: {
       type: Sequelize.INTEGER,
       allowNull: false,
       validate: {
            notEmpty: {
                msg: "general.validation_errors.required"
            },
        }
    }
});

module.exports = Booking;
