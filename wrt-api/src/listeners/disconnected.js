const {clients} = require("./index");

module.exports = function (socket) {
    socket.on("disconnect", function () {
        delete clients[socket.id];
        if(socket.userInfo?.room ==! undefined){
            socket.leave(socket.userInfo.room);
        }
        let NOMBRE_JOUEUR_MAX = 2;
        if(socket.adapter.rooms.has(socket.userInfo?.room)){
            socket.in(socket.userInfo.room).emit("number_user",  socket.adapter.rooms.get(socket.userInfo.room).size, NOMBRE_JOUEUR_MAX);
        }
    });
};