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
            ) `,

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
    });
}


module.exports = {
    getConnection,
    checkDbExist,
}


