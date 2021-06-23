const{getGame, getGameByName, getTopGames, getList} = require('../models/gameDAO.js');

async function getGames(req, res){
    const games = await getGame(req.query.nbrGames);

    res.json({
        "games" : games
    });
}

async function getAGameByName(req,res){
    const game = await getGameByName(req.query.game_name);

    res.json({
        "name" : game.name,
        "cover_url": game.cover_url,
        "online_max":game.online_max
    });
}

async function getTop50(req, res){
    const games = await getTopGames(req.query.nbr_games);

    res.json({
        "games": games
    })
    
}

async function getListGame(req, res){
    const games = await getList();
    
    res.json(games);
}

module.exports = {
    getGames,
    getAGameByName,
    getTop50,
    getListGame
}