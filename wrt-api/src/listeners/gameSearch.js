const {clients} = require("./index");
const userDAO = require('../models/userDAO');
const moment = require('moment');
const gameDAO = require("../models/gameDAO");

module.exports = function (socket) {
    socket.on("game_search", async function (game, user, language, platform, level) {

        socket.userInfo = {
            id: user,
            room: 'searching ' + game,
        };

        let userInfo = await userDAO.getUser(user);
        let age = 0;
        if(userInfo.birthdate !== null){
            age = moment().diff(userInfo.birthdate, 'years');
        }
        let nbMax = await gameDAO.getMaxPlayer(game);

        clients[socket.id] = {
            id: user,
            search:{
                game: game,
                game_max_player:nbMax,
                language: language,
                platform: platform,
                level:level
            },
            info:{
                age: age,
                languages: userInfo.languages
            }
        };
        socket.join('searching ' + game);
    });

};
