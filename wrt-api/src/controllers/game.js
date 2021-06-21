const{getGame} = require('../models/gameDAO.js');

async function getGames(req, res){
    const games = await getGame(req.query.nbrGames);

    res.json({
        "games" : games
    });
}

module.exports = {
    getGames
}