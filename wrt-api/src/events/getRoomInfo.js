const roomDAO = require("../models/roomDAO");
const event = async (socket, room) => {
    let tab = []
    let query = await roomDAO.getUser(room);
    
    if( query === null){
        return;
    }

    query.forEach(element => {
        tab.push({
            id: element.user,
        })
    });
    
    socket.emit("room_Info", [], tab);
};

module.exports = event;