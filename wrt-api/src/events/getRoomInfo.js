const roomDAO = require("../models/roomDAO");
const messageDAO = require("../models/messageDAO");
const event = async (socket, room) => {
    socket.join(room);
    //user
    let tab = [];
    let query = await roomDAO.getUser(room);
    
    if( query === null){
        return;
    }

    query.forEach(element => {
        tab.push({
            User_ID: element.user,
        })
    });
    
    //message
    let tabMessages = [];
    let queryMessages = await messageDAO.getRoomMessage(room);
    
    if( queryMessages === null){
        socket.emit("room_Info", [], tab);
        return;
    }

    queryMessages.forEach(element => {
        tabMessages.push({
            content: element.content,
            timestamp: element.timestamp,
            senderId: element.senderId,
            room:  element.room,
        })
    });

    socket.emit("room_Info", tabMessages, tab);
};

module.exports = event;