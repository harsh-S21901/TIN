const RoomRepository = require('../repository/sequelize/RoomRepository');

exports.showRoomsList = (req, res, next) => {
    RoomRepository.getRooms()
        .then(rooms => {
            res.render('pages/room/room-list', {
                rooms: rooms,
                navLocation: 'rooms'
            });
        });
}

exports.showRoomsFormNew = (req, res, next) => {
    res.render('pages/room/room-form', {
        room: {},
        pageTitle: req.__('rooms.new'),
        formMode: 'createNew',
        btnLabel: 'Add Room',
        formAction: '/rooms/add',
        navLocation: 'rooms',
        validationErrors: []
    });
}

exports.showRoomsFormEdit = (req, res, next) => {
    const roomId = req.params.roomId;
    
    RoomRepository.getRoomById(roomId)
        .then(room => {
            res.render('pages/room/room-form', {
                room: room,
                formMode: 'edit',
                pageTitle: req.__('rooms.edit'),
                btnLabel: 'Edit Room',
                formAction: '/rooms/edit',
                navLocation: 'rooms',
                validationErrors: []
            });
        });
}

exports.showRoomsDetails = (req, res, next) => {
    const roomId = req.params.roomId;
    
    RoomRepository.getRoomById(roomId)
        .then(room => {
            res.render('pages/room/room-form', {
                room: room,
                formMode: 'showDetails',
                pageTitle: req.__('rooms.details'),
                formAction: '',
                navLocation: 'rooms',
                validationErrors: []
            });
        });
}

exports.addRoom = (req, res, next) => {
    const roomData = { ...req.body };
    
    RoomRepository.createRoom(roomData)
        .then( result => {
            res.redirect('/rooms');
        })
        .catch(err => {
            res.render('pages/room/room-form', {
                room: roomData,
                formMode: 'createNew',
                pageTitle: req.__('rooms.new'),
                btnLabel: 'Add Room',
                formAction: '/rooms/add',
                navLocation: 'rooms',
                validationErrors: err.errors
            })
        });
};

exports.updateRoom = (req, res, next) => {
    const roomId = req.body._id;
    const roomData = { ...req.body };
    let error;
    
    RoomRepository.updateRoom(roomId, roomData)
        .then(result => {
            res.redirect('/rooms');
        })
        .catch(err => {
            error = err;
            return RoomRepository.getRoomById(roomId)
        })
        .then(room => {
            res.render('pages/room/room-form', {
                room: room,
                formMode: 'edit',
                pageTitle: req.__('rooms.edit'),
                btnLabel: 'Edit Room',
                formAction: '/rooms/edit',
                navLocation: 'rooms',

            })
        });
};

exports.deleteRoom = (req, res, next) => {
    const roomId = req.params.roomId;
    const roomData = { ...req.body };
    
    RoomRepository.deleteRoom(roomId)
        .then( () => {
            res.redirect('/rooms');
        })
        .catch(err => {
            res.render('pages/room/room-form', {
                room: roomData,
                formMode: 'delete',
                pageTitle: req.__('rooms.edit'),
                btnLabel: 'Delete Room',
                formAction: '/rooms/delete',
                navLocation: 'rooms',
                validationErrors: []
            })
        });
};