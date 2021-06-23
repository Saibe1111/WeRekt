const roomDAO = require("../models/roomDAO");
const messageDAO = require("../models/messageDAO");
const moment = require('moment');

const event = async (socket, room) => {
    if(socket.userInfo !== undefined){
        socket.leave(socket.userInfo.room);
    }
    

    socket.userInfo.room = room;
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
    
    if(queryMessages === null){
        socket.emit("room_Info", [], tab);
        return;
    }

    queryMessages.forEach(element => {
        tabMessages.push({
            content: element.content,
            timestamp: moment(element.timestamp, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'),
            senderId: element.senderId,
            sender: element.Username,
            room:  element.room,
        })
    });

    socket.emit("room_Info", tabMessages, tab);
};

module.exports = event;