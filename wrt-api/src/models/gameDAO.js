const database = require('../helpers/database.js');
const { getTop } = require('../helpers/igdb.js');


async function getGame(Nbr_Games = undefined) {
    let sql = "SELECT Game_Name, Cover_Url, Online_Max FROM Game"

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
                        cover_url: results[0].Cover_Url,
                        online_max:results[0].Online_Max
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
            } else {

                resolve([]);
            }
        })
        connection.end();
    });

}

async function getUserGames(discord_ID) {

    let sql = "SELECT * FROM Game where Game_Id=?;"

    const idList = await getPlaysGame(discord_ID);

    const connection = await database.getConnection();
    let Games = [];
    return new Promise(async function (resolve, reject) {

        if (idList.length == 0) {

            resolve([]);
            return;
        }
        for (let i = 0; i < idList.length; i++) {
            let pro = await connection.promise().query(sql, [idList[i]], (error, results) => {
                if (error) {
                    console.error(error.message);
                    reject(error);
                }
                if (results.length > 0) {
                    console.log(results);
                    resolve({ name: results[0].Game_Name, cover_url: results[0].Cover_Url, online_max:results[0].Online_Max })
                } else {
                    resolve([]);
                }
            }).then(function (data) {

                return { name: data[0][0].Game_Name, cover_url: data[0][0].Cover_Url, online_max:results[0][0].Online_Max }
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

async function getList() {
    const connection = await database.getConnection();
    let r = []

    let sql = "SELECT Game_Name From Game;"
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results) => {
            if (error) {
                console.error("getList error db", error.message);
                reject(error);
            }
            if (results.length > 0) {
                results.forEach(res=>{
                    r.push(res.Game_Name);
                })
                resolve(r);
            }
        });

        connection.end();
    }).catch(function(error){console.error(error.message)});
}

async function updateUserGames(discord_ID, Games) {
    const connection = await database.getConnection();
    let tab = JSON.parse(Games).games;
    connection.query("DELETE FROM Plays where User_Id = ? ;",[discord_ID], (error) => {
        if (error) {
            console.log("delete update games error", error.message);
        }

    });
    Array.prototype.forEach.call(tab, g=>{
        connection.query("SELECT Game_Id FROM Game where Game_Name = ?", [g], function(error,results){
            if(error){
                console.error("select update games error", error.message);
            }
            if(results.length > 0){
                playsGame(discord_ID, results[0].Game_Id);
            }
        })
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

module.exports = {
    getGame,
    getUserGames,
    updateUserGames,
    getGameByName,
    getTopGames,
    getList
}