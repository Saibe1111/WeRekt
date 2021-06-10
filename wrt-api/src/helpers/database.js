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
        if(err) throw err;
        console.log("connexion réussie");
        
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
    await createMessageTable(connection);
    await createLanguageTable(connection);
    await createIsFriendOfTable(connection);

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

async function createUser(connection) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.Users ( 
                ID varchar(255) PRIMARY KEY NOT NULL,
                Username varchar(255),
                Profile_Url varchar(255),
                Description varchar(255),
                Country varchar(255),
                Birthdate Date
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
                Id_Game int PRIMARY KEY NOT NULL,
                Name varchar(255)
            ); `,

            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error)
                } else {
                    console.log("CREATE TABLE Game")
                    resolve();
                }
            }
        );
    }).catch((error) => {
        console.log(error);
    });
}

async function createLanguageTable(connection) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.Language ( 
                Id_Lang int,
                Name varchar(255)
            ); `,

            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error)
                } else {
                    console.log("CREATE TABLE Language")
                    resolve();
                }
            }
        );
    }).catch((error) => {
        console.log(error);
    });
}

async function createMessageTable(connection) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.Message ( 
                Id_Message int,
                Name varchar(255),
                Content varchar(255),
                Sent_Time Date
            ); `,

            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error)
                } else {
                    console.log("CREATE TABLE Message")
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

module.exports = {
    getConnection,
    checkDbExist,
}


