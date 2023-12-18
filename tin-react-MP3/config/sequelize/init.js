const sequelize = require('./sequelize');
const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');


const Booking = require('../../model/sequelize/booking');
const Customer = require('../../model/sequelize/customers');
const Room = require('../../model/sequelize/room');

module.exports = () => {
    Customer.hasMany(Booking, {as: 'bookings', foreignKey: {name: 'customerId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Booking.belongsTo(Customer, {as: 'customers', foreignKey: {name: 'customerId', allowNull: false} });
    Room.hasMany(Booking, {as: 'bookings', foreignKey: {name: 'roomId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Booking.belongsTo(Room, {as: 'rooms', foreignKey: {name: 'roomId', allowNull: false} });

   let allCustomers, allRooms;
    return sequelize
        .sync({force: true})
       .then( () => {
            return Customer.findAll();
        })
        .then(customers => {
            if( !customers || customers.length == 0 ) {
                return Customer.bulkCreate([
                    {name: 'Harsh', surname: 'Patel', email: 'harsh.patel@gmail.com', password: passHash},
                    {name: 'Bruce', surname: 'Wayne', email: 'bruce.wayne@acme.com', password: passHash}
                ])
                .then( () => {
                    return Customer.findAll();
                });
            } else {
                return customers;
            }
        })
        .then( customers => {
            allCustomers = customers;
            return Room.findAll();
        })
        .then( rooms => {
            if( !rooms || rooms.length == 0 ) {
                return Room.bulkCreate([
                    { roomType: 'normal', roomNumber: '1', utility: 'normal'},
                    { roomType: 'VIP', roomNumber: '2', utility: 'VIP'}
                ])
                .then( () => {
                    return Room.findAll();
                });
            } else {
                return rooms;
            }
        })
        .then( rooms => {
            allRooms = rooms;
            return Booking.findAll();
        })
        .then( bookings => {
            if( !bookings || bookings.length == 0 ) {
                return Booking.bulkCreate([
                    {customerId: allCustomers[0]._id, roomId: allRooms[0]._id, dateFrom: '2001-01-01', dateTo: '2001-01-02'},
                    {customerId: allCustomers[1]._id, roomId: allRooms[1]._id, dateFrom: '2001-02-01', dateTo: '2001-02-03'}
                ]);
            } else {
                return bookings;
            }
        });
};