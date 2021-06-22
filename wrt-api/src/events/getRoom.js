const roomDAO = require("../models/roomDAO");
const gameDAO = require("../models/gameDAO");
const event = async (socket, user) => {
    let tab = []
    let query = await roomDAO.getRooms(user);
    
    if( query === null){
        return;
    }

    query.forEach(element => {

        let cover = gameDAO.getGameByName(element.game)

        tab.push({
            id: element.roomId,
            game: element.game,
            gameIcon: cover,
        })
    });
    
    socket.emit("room", tab);
};

module.exports = event;