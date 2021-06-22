const getRoom = require("../events/getRoom");

module.exports = function (socket) {
    socket.on("user_connected", function (user) {
        
        if(user !== null){
            getRoom(socket, user);
        }
        
    });
};
