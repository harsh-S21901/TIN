const express = require('express');
const router = express.Router();

const RoomApiController = require('../../api/RoomAPI');

router.get('/', RoomApiController.getRooms);
router.get('/:roomId', RoomApiController.getRoomById);
router.post('/', RoomApiController.createRoom);
router.put('/:roomId', RoomApiController.updateRoom);
router.delete('/:roomId', RoomApiController.deleteRoom);

module.exports = router;