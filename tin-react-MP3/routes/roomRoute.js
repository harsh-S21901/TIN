const express = require('express');
const router = express.Router();

const roomsController = require('../controllers/roomController');

router.get('/', roomsController.showRoomsList);
router.get('/add', roomsController.showRoomsFormNew);
router.get('/edit/:roomId', roomsController.showRoomsFormEdit);
router.get('/details/:roomId', roomsController.showRoomsDetails);

router.post('/add', roomsController.addRoom); 
router.post('/edit', roomsController.updateRoom);
router.get('/delete/:roomId', roomsController.deleteRoom);

module.exports = router;