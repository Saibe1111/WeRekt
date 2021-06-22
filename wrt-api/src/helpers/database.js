const mysql = require("mysql2");
const config = require("../config.json");
const { Sequelize } = require("sequelize");

async function getConnection() {

    const con = await mysql.createConnection({
        host: config.mysql.HOST,
        user: config.mysql.USER,
        password: config.mysql.PASSWORD,
        database: "werekt"
    });

    con.connect(function(err){
        if(err) console.err("Connection to database impossible !");
    });
    return con;
}

async function checkDbExist() {

    const connection = mysql.createConnection({
        host: config.mysql.HOST,
        user: config.mysql.USER,
        password: config.mysql.PASSWORD,
    });

    await werektDb(connection);
    await createUser(connection);
    await createGameTable(connection);
    await createPlaysTable(connection);
    await createIsFriendOfTable(connection);
    await createCredentialsTable(connection);
    await createRoom(connection);
    await createMessage(connection);

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
                    console.log("CREATE DATABASE WEREKT")
                    resolve();
                }
            }
        );
    }).catch((error) => {
        console.log(error);
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
                    console.log("CREATE TABLE ROOMS");
                    resolve();
                }
            }
        );
    }).catch((error) => {
        console.log(error);
    });
}

async function createMessage(connection) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.Messages ( 
                ID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                content varchar(255),
                timestamp varchar(255),
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
                    console.log("CREATE TABLE MESSAGES");
                    resolve();
                }
            }
        );
    }).catch((error) => {
        console.log(error);
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
                    console.log("CREATE TABLE USER")
                    resolve();
                }
            }
        );
    }).catch((error) => {
        console.log(error);
    });
}

async function createGameTable(connection) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.Game (
                Game_Id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                Game_Name varchar(255),
                Cover_Url varchar(255)
            ); `,

            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error)
                } else {
                    console.log("CREATE TABLE GAME")
                    resolve();
                }
            }
        );
    }).catch((error) => {
        console.log(error);
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
                    console.log("CREATE TABLE PLAYS")
                    resolve();
                }
            }
        );
    }).catch((error) => {
        console.log(error);
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
                    console.log("CREATE TABLE IsFriendOf");
                    resolve();
                }
            }
        );
       
    }).catch((error) => {
        console.log(error);
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
                    console.log("CREATE TABLE Credentials");
                    resolve();
                }
            }
        );
       
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = {
    getConnection,
    checkDbExist,
}


