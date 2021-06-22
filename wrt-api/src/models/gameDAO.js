const database = require('../helpers/database.js');
const { getCoverURLName, getTop } = require('../helpers/igdb.js');


async function createGame(discord_ID, game_name) {
    const connection = await database.getConnection();

    let sql = "INSERT INTO Game (Game_Name,Cover_Url) VALUES (?,?);"
    const CoverURL = await getCoverURLName(game_name);

    connection.query(sql, [game_name, CoverURL], (error) => {
        if (error) {
            console.error(error.message);
        } else {
            console.log("Game Inserted");
        }
    });

    connection.query("SELECT * From `game` where Game_Name = ?;", [game_name],
        (error, results) => {
            if (error)
                console.error(error.message);

            if (results.length > 0) {
                playsGame(discord_ID, results[0].Game_Id);
                return;
            }

        })
    connection.end();
}

async function insertTop50() {
    const connection = await database.getConnection();
    let sql = "INSERT INTO Game (Game_Name,Cover_Url) VALUES (?,?);"

    connection.query("Select * FROM Game;", async function (error, results) {
        if (error) {
            console.error(error.message);
            return;
        }
        if (results.length < 0) {
            let top = await getTopGames(50);
            top.forEach(e => {
                connection.query(sql, [e.name, e.cover], (error) => {
                    console.log("fait");
                    if (error) {
                        console.error(error.message);
                        return;
                    }
                })
            })
            console.log("Inserted");
            return;
        }
        if (results.length > 0) {
            return;
        }
    })

    connection.end();


}

async function playsGame(discord_ID, Game_Id) {
    const connection = await database.getConnection();

    let sql = "INSERT INTO Plays (Game_Id,User_Id) VALUES (?,?);"

    connection.query(sql, [Game_Id, discord_ID], (error) => {
        if (error)
            console.error(error.message);

    });
    connection.end();
}

async function getGame(Nbr_Games = undefined) {
    let sql = "SELECT Game_Name, Cover_Url FROM Game"

    if (Nbr_Games != undefined) {
        sql += ` ORDER BY RAND() LIMIT ${Nbr_Games}`
    }

    sql += ";"

    const connection = await database.getConnection();

    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results) => {
            if (error)
                console.error(error.message);
            if (results === undefined) {
                resolve([]);
            } else if (results.length > 0) {
                resolve(results);
            }
            else resolve([]);
        });
        connection.end();
    });
}

async function getGameByName(Game_Name) {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {
        connection.query("SELECT * From `Game` where Game_Name = ?;", [Game_Name],
            (error, results) => {
                if (error) {
                    console.error(error.message);
                    reject(error);
                }

                if (results === undefined) {
                    resolve([]);
                    return;
                }
                if (results.length > 0) {
                    resolve({
                        name: results[0].Game_Name,
                        cover_url: results[0].Cover_Url
                    });

                }

            })
        connection.end();
    });
}

async function getPlaysGame(discord_ID) {
    const connection = await database.getConnection();
    let sql = "SELECT Game_Id FROM Plays where User_Id = ?;"

    return new Promise((resolve, reject) => {
        connection.query(sql, [discord_ID], (error, results) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }

            if (results.length > 0) {
                let r = [];
                results.forEach(e => {
                    r.push(e.Game_Id);
                })

                resolve(r);
            }else{

                resolve([]);
            }
        })
        connection.end();
    });

}

async function getUserGames(discord_ID) {

    let sql = "SELECT Game_Name, Cover_Url FROM Game where Game_Id=?;"

    const idList = await getPlaysGame(discord_ID);

    const connection = await database.getConnection();
    let Games = [];
    return new Promise(async function(resolve, reject){

        if(idList.length == 0){
    
            resolve([]);
            return;
        }
        for(let i = 0; i<idList.length;i++){
            let pro = await connection.promise().query(sql, [idList[i]], (error, results) => {
                if (error) {
                    console.error(error.message);
                    reject(error);
                }
                if (results.length > 0) {
                    resolve( {name:results[0].Game_Name, cover_url:results[0].Cover_Url})
                } else {
                    resolve([]);
                }
            }).then(function(data){
                    return {name:data[0][0].Game_Name, cover_url:data[0][0].Cover_Url}
                });
            Games.push(pro);
       }
       resolve(Games)
        connection.end();
    })
}

async function getTopGames(Nbr_Games) {
    const response = await getTop(Nbr_Games);
    return response;
}

async function updateUserGames(discord_ID, Games) {
    const connection = await database.getConnection();
    let tab = JSON.parse(Games).games;
    connection.query("SELECT * FROM Game;", (error, results) => {
        if (results.length == 0) {
            tab.forEach(g => {
                createGame(discord_ID, g);
            })
        }
        tab.forEach(element => {
            results.forEach(r => {

                if (element === r.Game_Name) {

                    playsGame(discord_ID, r.Game_Id);
                }
                else {
                    createGame(discord_ID, element);
                }
            })
        });
    });

    connection.end();

}

module.exports = {

    getGame,
    getUserGames,
    updateUserGames,
    getGameByName,
    getTopGames,
    insertTop50
}