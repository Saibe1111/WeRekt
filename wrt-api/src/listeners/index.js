const roomDAO = require("../models/roomDAO");

let clients = {};

function start(io) {
    const fs = require("fs");
    const path = require("path");

    const listenersPath = path.resolve(__dirname);

    setInterval(() => {
    let nbMax = 0;
    let player = [];
    for (const [key, value] of Object.entries(clients)) {
        nbMax = value.search.game_max_player;
        player = [];
        for (const [key2, value2] of Object.entries(clients)) {
            
            let nb = 0;
            if (value.search.game === value2.search.game) {
                nb++;
            }
            
            if(value.search.platform !== null){
                //P1 a rien remplit
                if(value2.search.platform === value.search.platform){
                    //P2 et P1 on remplit pareil
                    nb++;
                }
            }else{
                //P1 n'a rien remplit
                if(value2.search.platform === null){
                    //P2 n'a rien remplit
                    nb++;
                }
            }
            if(value.search.language !== null){
                //P1 a rien remplit
                if(value2.search.language === value.search.language){
                    //P2 et P1 on remplit pareil
                    nb++;
                }else{
                    //P2 Pas remplit mais profil oui
                    if(value2.search.language !== null){
                        if(value2.info.languages.includes(value.search.language)){
                            nb++;
                        }
                    }
                }

            }else{
                //P1 n'a rien remplit
                if(value2.search.language === null){
                    //P2 n'a rien remplit
                    nb++;
                }
            }

            if(value.search.level === value2.search.level){
                nb++;
            }



            if(nb === 4){
                player.push(key2);
            }

        }
        io.in(key).emit(
            "number_user",
            player.length,
            nbMax
        );
        if (player.length >= nbMax) {
            let index = 0;
            let tab = [];
            player.forEach(element => {
                if (index < nbMax) {
                    tab.push(clients[element].id);
                    delete clients[element];
                    io.to(element).emit("launch_game");
                    index++;
                }
            });
            roomDAO.createRoom(tab, value.search.game);
        }
    }
    }, 1000);

    io.on("connection", function (socket) {
        fs.readdir(listenersPath, (err, files) => {
            if (err) {
                process.exit(1);
            }

            files.map((fileName) => {
                if (fileName !== "index.js") {
                    const listener = require(path.resolve(__dirname, fileName));
                    listener(socket);
                }
            });
        });
    });
}

function interval(io) {
    let NOMBRE_JOUEUR_MAX = 2;
    let player = [];
    for (const [key, value] of Object.entries(clients)) {
        //console.log(`${key}: ${value}`);

        for (const [key2, value2] of Object.entries(clients)) {
            let nb = 0;
            if (value.search.game === value2.search.game) {
                nb++;
            }
            
            if(value.search.platform !== ""){
                //P1 a rien remplit
                if(value2.search.platform === value.search.platform){
                    //P2 et P1 on remplit pareil
                    nb++;
                }
            }else{
                //P1 n'a rien remplit
                if(value2.search.platform === ""){
                    //P2 n'a rien remplit
                    nb++;
                }
            }

            if(value.search.language !== ""){
                //P1 a rien remplit
                if(value2.search.language === value.search.language){
                    //P2 et P1 on remplit pareil
                    nb++;
                }else{
                    //P2 Pas remplit mais profil oui
                    if(value2.search.language === ""){
                        value2.info.languages.includes(value.search.language);
                    }
                }

            }else{
                //P1 n'a rien remplit
                if(value2.search.language === ""){
                    //P2 n'a rien remplit
                    nb++;
                }
            }
            if(nb === 2){
                player.push[key2];
            }

        }
        io.in(key).emit(
            "number_user",
            player.length(),
            NOMBRE_JOUEUR_MAX
        );
        if (player.length() >= NOMBRE_JOUEUR_MAX) {
            let index = 0;
            let tab = [];
            player.forEach(element => {
                if (index < NOMBRE_JOUEUR_MAX) {
                    tab.push(clients[element].id);
                    delete clients[element];
                    io.to(element).emit("launch_game");
                    index++;
                }
            });
            roomDAO.createRoom(tab, key.replace("searching ", ""));
        }
    }
    //console.log(Object.keys(player).length);
}

function intervalOLD(io) {
    let NOMBRE_JOUEUR_MAX = 2;
    //We go through the rooms
    for (const [key, value] of io.sockets.adapter.rooms) {
        if (typeof key === "string") {
            //If it is a search
            if (key.includes("searching")) {
                //Update number of players available
                io.in(key).emit(
                    "number_user",
                    io.sockets.adapter.rooms.get(key).size,
                    NOMBRE_JOUEUR_MAX
                );

                //If we have enough players -> go
                if (
                    io.sockets.adapter.rooms.get(key).size >= NOMBRE_JOUEUR_MAX
                ) {
                    let index = 0;
                    let tab = [];
                    io.sockets.adapter.rooms
                        .get(key)
                        .forEach((values, keys) => {
                            if (index < NOMBRE_JOUEUR_MAX) {
                                tab.push(clients[keys].id);
                                io.to(keys).emit("launch_game");
                                index++;
                            }
                        });
                    roomDAO.createRoom(tab, key.replace("searching ", ""));
                }
            }
        }
    }
}

module.exports = {
    start,
    clients,
};
