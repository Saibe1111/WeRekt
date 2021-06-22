const messageDAO = require('../models/messageDAO');
const userDAO = require('../models/userDAO')
const emitInRoom = require("../events/emitInRoom");

module.exports = async function (socket) {
    socket.on("message", async function  (message) {
        messageDAO.createMessage(message.content, message.timestamp, message.senderId, message.room);
        let user = await userDAO.getUser(message.senderId);
        message.sender = user.username;
        emitInRoom(socket, "new_message", message.room, message);
    });
};