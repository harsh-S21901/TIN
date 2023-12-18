const Customer = require("../../model/sequelize/customers");
const Booking = require("../../model/sequelize/booking");
const Room = require("../../model/sequelize/room");

exports.getRooms = () => {
    return Room.findAll();
};

exports.getRoomById = (roomId) => {
    return Room.findByPk(roomId,
        {
            include: [{
                model: Booking,
                as: 'bookings',
                include: [{
                    model: Customer,
                    as: 'customers'
                }]
            }]
        });
};

exports.createRoom = (newRoomData) => {
    return Room.create({
        roomType: newRoomData.roomType,
        roomNumber: newRoomData.roomNumber,
        utility: newRoomData.utility,
    });
};

exports.updateRoom = (roomId, roomData) => {
    const roomType = roomData.roomType;
    const roomNumber = roomData.roomNumber;
    const utility = roomData.utility;
    return Room.update(roomData, {where: {_id: roomId }});
};

exports.deleteRoom = (roomId) => {
    return Room.destroy({
        where: { _id: roomId }
    });

}; 