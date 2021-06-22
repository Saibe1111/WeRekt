const roomDAO = require("../models/roomDAO");
const event = async (socket, room) => {
    socket.join(room);
    let tab = []
    let query = await roomDAO.getUser(room);
    
    if( query === null){
        return;
    }

    query.forEach(element => {
        tab.push({
            User_ID: element.user,
        })
    });
    
    
    socket.emit("room_Info", [], tab);
};

module.exports = event;