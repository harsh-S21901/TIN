const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/BookingController');

router.get('/', bookingController.showBookingList);
router.get('/add', bookingController.showBookingFormNew);
router.get('/edit/:bookingId', bookingController.showBookingFormEdit);
router.get('/details/:bookingId', bookingController.showBookingDetails);

router.post('/add', bookingController.addBooking); 
router.post('/edit', bookingController.updateBooking);
router.get('/delete/:bookingId', bookingController.deleteBooking);

module.exports = router;