module.exports = function (socket) {
    socket.on("leave_room", function (room) {
        socket.leave(room);
    });
};