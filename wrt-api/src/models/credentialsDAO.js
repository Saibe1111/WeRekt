const database = require("../helpers/database.js");



async function createCredentials(discord_ID, access_Token, refresh_Token) {

    
    return new Promise((resolve, reject) => {
        let sql =
            "INSERT INTO Credentials (ID_User, Access_Token, Refresh_Token) values (?,?,?);";
        database.getConnection((error, connection) => {
            if (error) throw error;
            connection.query(
                sql,
                [discord_ID, access_Token, refresh_Token],
                (error) => {
                    if (error) {
                        console.error(error.message);
                        connection.release();
                        reject(error);
                    } else {
                        console.log("Row inserted");
                        connection.release();
                        resolve();
                    }

                }

            );
        });
    }).catch((error) => {
        console.log(error);
    });
}

async function getCredentials(id) {
    
    return new Promise((resolve, reject) => {
        let sql =
            "SELECT Access_Token, Refresh_Token FROM Credentials where ID_User=?;";
        database.getConnection((error, connection) => {
            if (error) {
                console.error("database connection getCredentials error ", error.message);
                connection.release();
                return;
            }
            connection.query(sql, [id], (error, results) => {
                if (error) { connection.release();; console.error(error.message); }

                if (results === undefined) {
                    connection.release();
                    resolve(null);
                } else if (results.length > 0) {
                    connection.release();
                    resolve({
                        access_token: results[0].Access_Token,
                        refresh_token: results[0].Refresh_Token,
                    });
                } else {
                    connection.release();
                    resolve(null);
                }
            });
        })

    }).catch((error) => {
        console.log(error);
    });
}

async function updateCredentials(discord_ID, access_Token, refresh_Token) {
    
    return new Promise((resolve, reject) => {
        let sql = `UPDATE Credentials SET Access_Token=?, Refresh_Token=? WHERE ID_User = ?;`;
        database.getConnection((error, connection) => {
            connection.query(
                sql,
                [access_Token, refresh_Token, discord_ID],
                (error) => {
                    if (error) {
                        console.error(error.message);
                        connection.release();
                        reject(error);
                    } else {
                        console.log("Row Updated");
                        connection.release();
                        resolve();
                    }
                }
            );
        });
    }).catch((error) => {
            console.log(error);
        });
}

async function deleteCredentials(id) {
    
    return new Promise((resolve, reject) => {
        
        let sql = "DELETE FROM Credentials WHERE ID_User=?;";
        database.getConnection((error, connection) =>
        {connection.query(sql, [id], (error, results) => {
            if (error) {
                console.error(error.message);
                connection.release();
                reject(error);
            } else {
                connection.release();
                resolve();
                console.log("Row deleted");
            }
        });
    });
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = {
    getCredentials,
    createCredentials,
    updateCredentials,
    deleteCredentials,
};
