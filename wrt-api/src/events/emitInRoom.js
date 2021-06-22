const event = (socket, event, room ,...args) => {
    socket.in(room).emit(event, ...args);
    socket.emit(event, ...args);
};

module.exports = event;