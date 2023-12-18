const express = require('express');
const router = express.Router();

const bookingApiController = require('../../api/BookingAPI');

router.get('/', bookingApiController.getBookings);
router.get('/:bookingId', bookingApiController.getBookingById);
router.post('/', bookingApiController.createBooking);
router.put('/:bookingId', bookingApiController.updateBooking);
router.delete('/:bookingId', bookingApiController.deleteBooking);

module.exports = router;