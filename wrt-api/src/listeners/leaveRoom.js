module.exports = function (socket) {
    socket.on("leave_room", function () {
        
        socket.leave(socket.userInfo.room);
    });
};