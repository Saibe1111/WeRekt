const changeRoom = require("../events/changeRoom");
const emitInRoom = require("../events/emitInRoom");

module.exports = function (socket) {
    socket.on("game_search", function (game, user) {
        let NOMBRE_JOUEUR_MAX = 3;
        console.log(`${user} cherche une partie de ${game}`);
        socket.userInfo = {
            id: user,
            room: game
        };
        //console.log(socket.userInfo)
        socket.join(game);
        emitInRoom(socket, "number_user",  socket.adapter.rooms.get(game).size, NOMBRE_JOUEUR_MAX);
        if(socket.adapter.rooms.get(game).size >= NOMBRE_JOUEUR_MAX){
            socket.emit("launch_game");
            socket.in(socket.userInfo.room).emit("launch_game");
        }
        
    });
    
};