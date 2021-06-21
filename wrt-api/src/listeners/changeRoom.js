const getRoomInfo = require("../events/getRoomInfo");
module.exports = function (socket) {
    socket.on("change_room", function (room) {
        getRoomInfo(socket, room);
    });
};