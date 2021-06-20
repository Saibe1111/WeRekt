const event = (socket, event ,...args) => {
    socket.in(socket.userInfo.room).emit(event, ...args);
    socket.emit(event, ...args);
};

module.exports = event;