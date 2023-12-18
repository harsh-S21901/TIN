const BookingRepository = require('../repository/sequelize/BookingRepository');

exports.getBookings = (req, res, next) => {
    BookingRepository.getBookings()
        .then(bookings => {
            res.status(200).json(bookings);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getBookingById = (req, res, next) => {
    const bookingId = req.params.bookingId;
    
    BookingRepository.getBookingById(bookingId)
        .then(booking => {
            if (!booking) {
                res.status(404).json({
                    message: 'Booking with id: ' + bookingId + ' not found'
                })
            } else {
                res.status(200).json(booking);
            }
        });
};

exports.createBooking = (req, res, next) => {
    BookingRepository.createBooking(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateBooking = (req, res, next) => {
    const bookingId = req.params.bookingId;
    
    BookingRepository.updateBooking(bookingId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Booking updated!', booking: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteBooking = (req, res, next) => {
    const bookingId = req.params.bookingId;
    
    BookingRepository.deleteBooking(bookingId)
        .then(result => {
            res.status(200).json({ message: 'Removed booking', booking: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};