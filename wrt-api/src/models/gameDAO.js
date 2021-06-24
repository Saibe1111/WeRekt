const database = require('../helpers/database.js');
const { getTop } = require('../helpers/igdb.js');



async function getGame(Nbr_Games = undefined) {


    let sql = "SELECT Game_Name, Cover_Url, Online_Max FROM Game"

    if (Nbr_Games != undefined) {
        sql += ` ORDER BY RAND() LIMIT ${Nbr_Games}`
    }

    sql += ";"


    return new Promise((resolve, reject) => {
        database.getConnection((error, connection) => {
            connection.query(sql, (error, results) => {
                if (error) {
                    console.error(error.message);
                    connection.release();
                }
                if (results === undefined) {
                    connection.release();
                    resolve([]);
                } else if (results.length > 0) {
                    connection.release();
                    resolve(results);
                }
                else {
                    connection.release();
                    resolve([]);
                }
            });
        })
    });
}

async function getGameByName(Game_Name) {


    return new Promise((resolve, reject) => {
        database.getConnection((error, connection) => {
            if (error) {
                console.error("database connection getGameByName error", error.message);
                connection.release();
                reject(error);
            }
            connection.query("SELECT * From `Game` where Game_Name = ?;", [Game_Name],
                (error, results) => {
                    if (error) {
                        console.error(error.message);
                        reject(error);
                    }

                    if (results === undefined) {
                        connection.release();
                        resolve([]);
                        return;
                    }
                    if (results.length > 0) {
                        connection.release();
                        resolve({
                            name: results[0].Game_Name,
                            cover_url: results[0].Cover_Url,
                            online_max: results[0].Online_Max
                        });

                    }

                });
        });
    });
}

async function getPlaysGame(discord_ID) {

    let sql = "SELECT Game_Id FROM Plays where User_Id = ?;"

    return new Promise((resolve, reject) => {
        database.getConnection((error, connection) => {
            if (error) {
                console.error("database connection getPlaysGame error", error.message);
                connection.release();
                reject(error);
            }
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
        })

    });

}

async function getMaxPlayer(Game_Name) {

    return new Promise((resolve, reject) => {
        database.getConnection((error, connection) => {
            if (error) {
                console.error("database connection getMaxPlayer error", error.message);
                connection.release();
                reject(error);
            }
            connection.query("Select Online_Max From Game where Game_Name = ?;", [Game_Name], (error, results) => {
                if (error) {
                    console.error("getMaxPlayer error", error.message);
                    connection.release();
                    reject(error);
                }

                if (results.length > 0) {
                    connection.release();
                    resolve(results[0].Online_Max);
                }
            });
        })

    });
}


async function getUserGames(discord_ID){
    let sql = "SELECT * FROM Game INNER JOIN Plays ON Game.Game_Id = Plays.Game_Id where Plays.User_Id = ?";

    return new Promise((resolve, results) =>{
        database.getConnection((error, connection)=>{
            connection.query(sql, [discord_ID], (error, results)=>{
                connection.release();
                if(error) reject(error);
                if(results.length > 0){
                    let Game = [];
                    Array.prototype.forEach.call(results, res=>{
                        Game.push({name: res.Game_Name, cover_url: res.Cover_Url, onlinemax: res.Online_Max})
                    });
                    resolve(Game);
                }
            })
        })
    })
}

async function getTopGames(Nbr_Games) {
    const response = await getTop(Nbr_Games);
    return response;
}

async function getList() {

    let r = []

    let sql = "SELECT Game_Name From Game;"
    return new Promise((resolve, reject) => {
        database.getConnection((error, connection) => {
            if (error) {
                console.error("database connection getList error ", error.message);
                connection.release();
                reject(error);
            }
            connection.query(sql, (error, results) => {
                if (error) {
                    console.error("getList error db", error.message);
                    connection.release();
                    reject(error);
                }
                if (results.length > 0) {
                    results.forEach(res => {
                        r.push(res.Game_Name);
                    })
                    connection.release();
                    resolve(r);
                }
            });
        });

    }).catch(function (error) { console.error(error.message) });
}

async function updateUserGames(discord_ID, Games) {

    let tab = JSON.parse(Games).games;
    return new Promise((resolve, reject) => {
        database.getConnection((error, connection) => {
            if (error) {
                console.error("database connection updateUserGames error", error.message);
                connection.release();
                reject(error);
            }
            connection.query("DELETE FROM Plays where User_Id = ? ;", [discord_ID], (error) => {
                if (error) {
                    console.error("delete update games error", error.message);
                    connection.release();
                    reject(error);
                }

            });
            Array.prototype.forEach.call(tab, g => {
                connection.query("SELECT Game_Id FROM Game where Game_Name = ?", [g], function (error, results) {
                    if (error) {
                        console.error("select update games error", error.message);
                    }
                    if (results.length > 0) {
                        playsGame(discord_ID, results[0].Game_Id);
                    }
                })
            })
            connection.release();
            resolve();
        })
    })


}

async function playsGame(discord_ID, Game_Id) {


    let sql = "INSERT INTO Plays (Game_Id,User_Id) VALUES (?,?);"

    database.getConnection((error, connection) => {
        if (error) {
            console.error("database connection playsGame error", error.message);
            connection.release();
            return;
        }
        connection.query(sql, [Game_Id, discord_ID], (error) => {
            connection.release();
            if (error)
                console.error(error.message);

        });
    });
}

module.exports = {
    getGame,
    getUserGames,
    updateUserGames,
    getGameByName,
    getTopGames,
    getList,
    getMaxPlayer
}