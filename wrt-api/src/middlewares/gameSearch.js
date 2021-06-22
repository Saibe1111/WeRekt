
let clients = {};

module.exports = function (socket) {
    socket.on("game_search", function (game, user) {
        
        console.log(`${user} cherche une partie de ${game}`);
        socket.userInfo = {
            id: user,
            room: 'searching ' + game
        };

        clients[socket.id] = user;

        socket.join('searching ' + game);
    });

};
