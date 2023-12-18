const Sequelize = require('sequelize');

const Booking = require('../../model/sequelize/booking');
const Customer = require('../../model/sequelize/customers');
const Room = require('../../model/sequelize/room');

exports.getBookings = () => {
    return Booking.findAll({
        include: [
        {
            model: Customer,
            as: 'customers'
        },
        {
            model: Room,
            as: 'rooms'
        }]
    });
};


exports.getBookingById = (bookingId) => {
    return Booking.findByPk(bookingId, {
        include: [
            {
                model: Customer,
                as: 'customers'
            },
            {
                model: Room,
                as: 'rooms'
            }]
    });
};

exports.createBooking = (data) => {
    console.log(JSON.stringify(data));

    return Booking.create({
        customerId: data.customerId,
        roomId: data.roomId,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo
    });
};

exports.updateBooking = (bookingId, data) => {
    return Booking.update(data, {where: {_id: bookingId }});
}

exports.deleteBooking = (bookingId) => {
    return Booking.destroy({
        where: { _id: bookingId }
    });
}

exports.deleteManyBookings = (bookingIds) => {
    return Booking.find({ _id: { [Sequelize.Op.in]: bookingIds }})
}