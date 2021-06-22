const messageDAO = require('../models/messageDAO')
const emitInRoom = require("../events/emitInRoom");

module.exports = function (socket) {
    socket.on("message", function (message) {
        messageDAO.createMessage(message.content, message.timestamp, message.senderId, message.room);
        emitInRoom(socket, "new_message", message.room, message);
    });
};