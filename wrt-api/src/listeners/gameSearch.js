const roomDAO = require("../models/roomDAO");
const emitInRoom = require("../events/emitInRoom");
let clients = {};

module.exports = function (socket) {
    socket.on("game_search", function (game, user) {
        let NOMBRE_JOUEUR_MAX = 2;
        console.log(`${user} cherche une partie de ${game}`);
        socket.userInfo = {
            id: user,
            room: game
        };

        clients[socket.id] = user;

        socket.join(game);
        emitInRoom(socket, "number_user",  socket.adapter.rooms.get(game).size, NOMBRE_JOUEUR_MAX);
        
        if(socket.adapter.rooms.get(game).size >= NOMBRE_JOUEUR_MAX){
            
            socket.emit("launch_game");
            socket.in(socket.userInfo.room).emit("launch_game");

            let tab = [];
            socket.adapter.rooms.get(game).forEach(element => {
                tab.push(clients[element]);
                //delete clients[element];
            });
            
            roomDAO.createRoom(tab);
            console.log(socket.adapter.rooms)
        }
        
    });
    
};