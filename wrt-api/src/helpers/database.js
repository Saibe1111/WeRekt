const mysql = require("mysql2");
const config = require("../config.json");
const { Sequelize } = require("sequelize");
const { getTop } = require('../helpers/igdb.js');
const pool = mysql.createPool({
    connectionLimit: 500,
    host: config.mysql.HOST,
    user: config.mysql.USER,
    password: config.mysql.PASSWORD,
    database: "werekt"
});



async function checkDbExist() {

    const connection = mysql.createConnection({
        host: config.mysql.HOST,
        user: config.mysql.USER,
        password: config.mysql.PASSWORD

    });

    await werektDb(connection);
    await createUser(connection);
    await createGameTable(connection);
    await createPlaysTable(connection);
    await createIsFriendOfTable(connection);
    await createCredentialsTable(connection);
    await createRoom(connection);
    await createMessage(connection);
    await insertTop();
    console.log("Game table set");
    connection.end();

}

async function werektDb(connection) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE DATABASE IF NOT EXISTS werekt;`,
            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error)
                } else {
                    resolve();
                }
            }
        );

    }).catch((error) => {
        console.error(error.message);
    });
}

async function createRoom(connection) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.Rooms ( 
                Id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                user varchar(255),
                roomId int,
                game varchar(255),
                FOREIGN KEY (user) REFERENCES Users(ID)
            ); `,

            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error);
                } else {
                    resolve();
                }
            }
        );

    }).catch((error) => {
        console.error(error.message);
    });
}

async function createMessage(connection) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.Messages ( 
                ID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                content varchar(255),
                timestamp DATETIME,
                senderId varchar(255),
                roomId int,
                FOREIGN KEY (senderId) REFERENCES Users(ID),
                FOREIGN KEY (roomId) REFERENCES Rooms(ID)
            ); `,

            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error);
                } else {
                    resolve();
                }
            }
        );

    }).catch((error) => {
        console.error(error.message);
    });
}



async function createUser(connection) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.Users ( 
                ID varchar(255) PRIMARY KEY NOT NULL,
                Username varchar(255),
                Profile_Url varchar(255),
                Description varchar(255),
                Country varchar(255),
                Birthdate Date,
                Banner varchar(255),
                Languages json,
                Platforms json,
                Social_Networks json
            ); `,

            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error)
                } else {
                    resolve();
                }
            }
        );

    }).catch((error) => {
        console.error(error.message);
    });
}

async function createGameTable(connection) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.Game (
                Game_Id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                Game_Name varchar(255) UNIQUE,
                Cover_Url varchar(255),
                Online_Max int
            ); `,

            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error)
                } else {

                    resolve();
                }
            }
        );

    }).catch((error) => {
        console.error(error.message);
    });
}

async function createPlaysTable(connection) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.Plays ( 
                Game_Id int,
                User_Id varchar(255),
                FOREIGN KEY (Game_Id) REFERENCES Game(Game_Id),
                FOREIGN KEY (User_Id) REFERENCES Users(ID),
                CONSTRAINT PK_Plays PRIMARY KEY (Game_Id, User_Id)
            ); `,

            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error)
                } else {

                    resolve();
                }
            }
        );

    }).catch((error) => {
        console.error(error.message);
    });
}

async function createIsFriendOfTable(connection) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.IsFriendOf ( 
                ID_User1 varchar(255),
                ID_User2 varchar(255),
                FOREIGN KEY (ID_User1) REFERENCES Users(ID),
                FOREIGN KEY (ID_User2) REFERENCES Users(ID),
                CONSTRAINT PK_IsFriend PRIMARY KEY (ID_User1, ID_User2)
            ); `,

            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error)
                } else {

                    resolve();
                }
            }
        );

    }).catch((error) => {
        console.error(error.message);
    });
}

async function createCredentialsTable(connection) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.Credentials ( 
                ID_User varchar(255) PRIMARY KEY NOT NULL,
                Access_Token varchar(255),
                Refresh_Token varchar(255)
            ); `,

            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error)
                } else {
                    resolve();
                }
            }
        );

    }).catch((error) => {
        console.error(error.message);
    });
}

async function insertTop() {

    let sql = "INSERT INTO Game (Game_Name,Cover_Url, Online_Max) VALUES (?,?,?);"
    let top = []
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {

            if (error) {
                console.error("pool connection insertTop error", error.message);
                reject(error);
            }
            connection.query("Select count(Game_Id) as cnt From Game;", async function (error, results) {

                if (error) {
                    console.error("A Select error from insertTop50 ", error.messsage);
                    reject(error);
                }

                if (results[0].cnt < config.igdb_api.GAMES_LIMIT) {
                    top = await getTop(config.igdb_api.GAMES_LIMIT);
                    top.forEach(function (e) {
                        connection.query(sql, [e.name, e.cover, e.online_max], (error) => {
                            if (error) {
                                console.error(error.message);
                                connection.release();
                                reject(error);
                            }
                        });
                    });
                    connection.query("INSERT INTO Game (Game_Name, Cover_Url,Online_Max) VALUES (?,?,?);", ["Zugzwang",
                        "https://cdn.discordapp.com/attachments/652503230932058114/857220754989776916/unknown.png", 2], (error) => {
                            if (error) {
                                console.error(error.message);
                                connection.release();
                                reject(error);
                            } else {
                                connection.release();
                                resolve();
                            }
                        });
                }

            });


        });


    });




}

module.exports = {
    checkDbExist,
    getConnection: (callback)=>{
        return pool.getConnection(callback);
    }
}


