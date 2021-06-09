const mysql = require("mysql2");
const config = require("../config.json");

async function getConnection(){
    

}

async function checkDbExist(){
    
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

}

async function werektDb(connection){
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE DATABASE IF NOT EXISTS werekt;`,
            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error)
                }else{
                    console.log("CREATE DATABASE WEREKT")
                    resolve();
                }
            }
        );
    }).catch((error)=>{
        console.log(error);
    });
}

async function createUser(connection){
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.Users ( 
                ID int,
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
                }else{
                    console.log("CREATE TABLE USER")
                    resolve();
                }
            }
        );
    }).catch((error)=>{
        console.log(error);
    });
}

async function createGameTable(connection){
    return new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS werekt.Game ( 
                Id_Game int,
                Name varchar(255)
            ); `,

            (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error)
                }else{
                    console.log("CREATE TABLE Game")
                    resolve();
                }
            }
        );
    }).catch((error)=>{
        console.log(error);
    });
}

async function createLanguageTable(connection){
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
                }else{
                    console.log("CREATE TABLE Language")
                    resolve();
                }
            }
        );
    }).catch((error)=>{
        console.log(error);
    });
}

async function createMessageTable(connection){
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
                }else{
                    console.log("CREATE TABLE Message")
                    resolve();
                }
            }
        );
    }).catch((error)=>{
        console.log(error);
    });
}


module.exports = {
    getConnection,
    checkDbExist,
}


