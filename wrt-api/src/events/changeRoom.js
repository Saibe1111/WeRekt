const event = (socket, room) => {
    socket.leave(socket.userInfo.room);
    socket.join(room);
    socket.user.room = room;
};

module.exports = event;
