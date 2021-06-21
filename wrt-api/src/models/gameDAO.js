const database = require('../helpers/database.js');
const {getCoverURL} = require('../helpers/igdb.js');


async function createGame(discord_ID, game_name){
    const connection = await database.getConnection();

    let sql = "INSERT INTO Game (Game_Name,Cover_Url) VALUES (?,?);"
    const CoverURL = await getCoverURL(game_name)
    connection.query(sql, [game_name, CoverURL], (error) => {
        if(error){
            console.error(error.message);
        }else{
            console.log("Game Inserted");
        }
    });

    connection.query("SELECT * From `game` where Game_Name = ?;",[game_name],
    (error,results)=>{
        if(error)
            console.error(error.message);

            if(results.length > 0){
                playsGame(discord_ID, results[0].Game_Id);
                return;
            }
        
    })
    connection.end();
}

async function playsGame(discord_ID, Game_Id){
    const connection = await database.getConnection();
    
    let sql = "INSERT INTO Plays (Game_Id,User_Id) VALUES (?,?);"

    connection.query(sql, [Game_Id,discord_ID], (error)=>{
        if(error)
            console.error(error.message);
        
    });
    connection.end();
}

async function getGame(Nbr_Games=undefined){
    let sql = "SELECT Game_Name, Cover_Url FROM Game"

    if(Nbr_Games != undefined){
        sql += ` ORDER BY RAND() LIMIT ${Nbr_Games}`
    }

    sql += ";"

    const connection = await database.getConnection();

    return new Promise((resolve, reject)=>{
        connection.query(sql, (error,results)=>{
            if(error)
                console.error(error.message);
            if(results === undefined){
                resolve([]);
            }else if (results.length > 0){
                resolve(results);
            }
            else resolve([]);
        });
        connection.end();
    });
}

async function getUserGames(discord_ID){
    let sql1 = "SELECT Game_Id FROM Plays where User_Id = ?;"
    let sql2 = "SELECT Game_Name, Cover_Url FROM Game where Game_Id in (?)"
    const connection = await database.getConnection();
    let params = []
    return new Promise((resolve, reject)=>{
        connection.query(sql1,[discord_ID],(error,results)=>{
            if(error){
                console.error(error.message);
                reject(error);

            }

            if(results.length>0){
                params =  results.join(", ");
                params = params.replace(/"/g, "");
            }else{
                connection.end();
                resolve([]);
                return;
            }

            connection.query(sql2,[params],(error, results)=>{
                if(error){
                    console.error(error.message);
                    reject(error)
                }
                if(results.length){
                    let games = [];
                    results.forEach(r => {
                        games.push({game_name : r.Game_Name, cover_url:r.Cover_Url});
                    })
                    resolve(games);
                }else
                    resolve([]);
            })

            connection.end();
        })


    })
}

async function updateUserGames(discord_ID, Games){
    const connection = await database.getConnection();
    let tab = JSON.parse(Games).games;
    connection.query("SELECT * FROM Game;", (error,results)=>{
        if(results.length == 0){
            tab.forEach(g => {
                createGame(discord_ID, g);
            })
        }
        tab.forEach(element => {
            results.forEach(r =>{
                
                if(element === r.Game_Name){
                    console.log("C'est bon");
                    playsGame(discord_ID, r.Game_Id);
                }
                else{
                    createGame(discord_ID, element);
                }
            })
        });
    });

}

module.exports = {

    getGame,
    getUserGames,
    updateUserGames
}