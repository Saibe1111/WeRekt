const { cpuUsage } = require("process");
const gameSearch = require("../middlewares/gameSearch");
const roomDAO = require('../models/roomDAO');

let clients = {};

module.exports = (io) => {
    const fs = require("fs");
    const path = require("path");

    const listenersPath = path.resolve(__dirname);

    let NOMBRE_JOUEUR_MAX = 2;
    setInterval(() => {
        for(const [key, value] of io.sockets.adapter.rooms){
            if(typeof key === "string"){
            if(key.includes("searching")){
                io.in(key).emit('number_user', io.sockets.adapter.rooms.get(key).size, NOMBRE_JOUEUR_MAX);
                if(io.sockets.adapter.rooms.get(key).size >= NOMBRE_JOUEUR_MAX){
                    let index = 0;
                    let tab = [];
                    io.sockets.adapter.rooms.get(key).forEach((values,keys)=>{
                        if (index < NOMBRE_JOUEUR_MAX){
                            tab.push(clients[keys]);
                            io.to(keys).emit("launch_game");
                            index++;
                        }
                        
                    });
                    roomDAO.createRoom(tab, key.replace('searching ', ''));
                }
            }
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

        socket.on("game_search", function (game, user, language, platform, maxAge, minAge) {
            socket.userInfo = {
                id: user,
                room: 'searching ' + game
            };
            clients[socket.id] = user;
            socket.join('searching ' + game);
        });
    });

    
};
