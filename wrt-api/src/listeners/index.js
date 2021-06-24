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
                    if(value2.search.language === null){
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

module.exports = {
    start,
    clients,
};
