const roomDAO = require("../models/roomDAO");
const gameDAO = require("../models/gameDAO");
const event = async (socket, user) => {
    let tab = [];
    let query = await roomDAO.getRooms(user);

    if (query === null) {
        return;
    }

    await asyncForEach(query, async (element) => {
        let cover = await gameDAO.getGameByName(element.game);
        
        tab.push({
            id: element.roomId,
            game: element.game,
            gameIcon: cover.cover_url,
        });
    });

    let userInfo = {
        room: tab[tab.length - 1].id,
    };

    socket.userInfo = userInfo;
    socket.emit("room", tab);
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = event;
