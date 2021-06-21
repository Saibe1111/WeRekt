const roomDAO = require("../models/roomDAO");
const event = async (socket, user) => {
    let tab = []
    let query = await roomDAO.getRooms(user);
    
    if( query === null){
        return;
    }

    query.forEach(element => {
        tab.push({
            id: element.roomId,
            game: element.game,
            gameIcon:
                "https://images.igdb.com/igdb/image/upload/t_cover_big/co1uaf.jpg",
        })
    });
    
    socket.emit("room", tab);
};

module.exports = event;