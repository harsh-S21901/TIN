const Customer = require("../../model/sequelize/customers");
const Booking = require("../../model/sequelize/booking");
const Room = require("../../model/sequelize/room");

exports.getCustomers = () => {
    return Customer.findAll();
};

exports.getCustomerById = (customerId) => {
    return Customer.findByPk(customerId,
        {
            include: [{
                model: Booking,
                as: 'bookings',
                include: [{
                    model: Room,
                    as: 'rooms'
                }]
            }]
        });
};

exports.createCustomer = (newCustomerData) => {
    return Customer.create({
        name: newCustomerData.name,
        surname: newCustomerData.surname,
        email: newCustomerData.email,
    });
};

exports.updateCustomer = (customerId, customerData) => {
    const name = customerData.firstName;
    const surname = customerData.lastName;
    const email = customerData.email;
    return Customer.update(customerData, {where: {_id: customerId }});
};

exports.deleteCustomer = (customerId) => {
    return Customer.destroy({
        where: { _id: customerId }
    });

}; 

exports.findByEmail = (email) => {
    return Customer.findOne({
        where: {email:email}
    });
};