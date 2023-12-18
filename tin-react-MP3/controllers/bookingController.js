const BookingRepository = require('../repository/sequelize/BookingRepository');
const CustomerRepository = require('../repository/sequelize/CustomerRepository');
const RoomRepository = require('../repository/sequelize/roomRepository');

exports.showBookingList = (req, res, next) => {
    BookingRepository.getBookings()
        .then(bookings => {
            res.render('pages/booking/booking-list', {
                bookings: bookings,
                pageTitle: 'List of Bookings',
                navLocation: 'booking'
            });
        });
}

exports.showBookingFormNew = (req, res, next) => {
    let allCustomers, allRooms;
    
    BookingRepository.getBookings()
        .then(bookings => {
            allBookings = bookings;
            return CustomerRepository.getCustomers();
        })
        .then(customers => {
            allCustomers = customers;
            return RoomRepository.getRooms();
        })
        .then(rooms => {
            allRooms = rooms;
            res.render('pages/booking/booking-form', {
                booking: {},
                allCustomers: allCustomers,
                allRooms: allRooms,
                formMode: 'createNew',
                pageTitle: req.__('bookings.new'),
                btnLabel: 'Add Booking',
                formAction: '/booking/add',
                navLocation: 'booking',
                validationErrors: []
            });
        });
}

exports.showBookingFormEdit = (req, res, next) => {
    const bookingId = req.params.bookingId;
    let allCustomers, allRooms, allBookings;
    
    BookingRepository.getBookings()
        .then(bookings => {
            allBookings = bookings;
            return CustomerRepository.getCustomers();
        })
        .then(customers => {
            allCustomers = customers;
            return RoomRepository.getRooms();
        })
        .then(rooms => {
            allRooms = rooms;
            return BookingRepository.getBookingById(bookingId);
        })
        .then(booking => {
            res.render('pages/booking/booking-form', {
                booking: booking,
                allCustomers: allCustomers,
                allRooms: allRooms,
                allBookings: allBookings,
                formMode: 'edit',
                pageTitle: req.__('bookings.edit'),
                btnLabel: 'Edit Booking',
                formAction: '/booking/edit',
                navLocation: 'booking',
                validationErrors: []
            });
            console.log(booking); 
            
        });
}

exports.showBookingDetails = (req, res, next) => {
    const bookingId = req.params.bookingId;
    let allCustomers, allRooms;
    
    CustomerRepository.getCustomers()
        .then(customers => {
            allCustomers = customers;
            return RoomRepository.getRooms();
        })
        .then(rooms => {
            allRooms = rooms;
            return BookingRepository.getBookingById(bookingId)
        })
        .then(booking => {
            res.render('pages/booking/booking-form', {
                booking: booking,
                allCustomers: allCustomers,
                allRooms: allRooms,
                formMode: 'showDetails',
                pageTitle: req.__('bookings.details'),
                formAction: '',
                navLocation: 'booking',
                validationErrors: []
            });
        });    
        
        
}

exports.addBooking = (req, res, next) => {
    let allCustomers, allRooms, error;
    const bookingData = { ...req.body };
    
    BookingRepository.createBooking(bookingData)
        .then(result => {
            res.redirect('/booking');
        })
        .catch(err => {
            error = err;
            return CustomerRepository.getCustomers();   
        })
        .then(customers => {
            allCustomers= customers;
            return RoomRepository.getRooms()
        })
        .then(rooms => {
            allRooms = rooms;
            res.render('pages/booking/booking-form', {
                booking: {},
                allCustomers: allCustomers,
                allRooms: allRooms,
                formMode: 'createNew',
                pageTitle: req.__('bookings.new'),
                btnLabel: 'Add Booking',
                formAction: '/booking/add',
                navLocation: 'booking'
            });
        });
};



exports.updateBooking = (req, res, next) => {
    let allCustomers, allRooms, error;
    const bookingId = req.body._id;
    const bookingData = { ...req.body };
    
    BookingRepository.updateBooking(bookingId, bookingData)
        .then(result => {
            res.redirect('/booking');
        })
        .catch(err => { 
            error = err;
            return CustomerRepository.getCustomers()
        })
        .then(customers => {
            allCustomers = customers;
            return RoomRepository.getRooms();
        })
        .then(rooms => {
            allRooms = rooms;
            return BookingRepository.getBookingById(bookingId)
        })
        .then(booking => {
            res.render('pages/booking/booking-form', {
                booking: booking,
                allCustomers: allCustomers,
                allRooms: allRooms,
                formMode: 'edit',
                pageTitle: req.__('bookings.edit'),
                btnLabel: 'Edit Booking',
                formAction: '/booking/edit',
                navLocation: 'booking',
            });
        });
};

exports.deleteBooking = (req, res, next) => {
    const bookingId = req.params.bookingId;
    
    BookingRepository.deleteBooking(bookingId)
        .then(() => {
            res.redirect('/booking');
        })
        .catch(err => {
            res.render('pages/booking/booking-form', {
                booking: bookingData,
                pageTitle: req.__('bookings.edit'),
                formMode: 'delete',
                btnLabel: 'Delete Booking',
                formAction: '/booking/delete',
                navLocation: 'booking',
                validationErrors: []
            })
        });
};