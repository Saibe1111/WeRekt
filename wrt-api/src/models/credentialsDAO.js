const database = require('../helpers/database.js');

async function createCredentials(discord_ID, access_Token, refresh_Token) {
    const connection = await database.getConnection();

    return new Promise((resolve, reject) => {


        let sql = "INSERT INTO Credentials (ID_User, Access_Token, Refresh_Token) values (?,?,?);";

        connection.query(sql, [discord_ID, access_Token, refresh_Token], (error) => {
            if (error) {
                console.error(error.message);
                reject(error)
            } else {
                console.log("Row inserted");
                resolve();
            }
        }

        )

    }).catch((error) => {
        console.log(error);
    });

}

async function getCredentials(id) {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {
        let sql = "SELECT Access_Token, Refresh_Token FROM Credentials where ID_User=?;";
        connection.query(sql, [id], (error, results) => {
            if (error)
                console.error(error.message);

            if (results.length > 0) {
                resolve({
                    access_token: results[0].Access_Token,
                    refresh_token: results[0].Refresh_Token
                });
            } else {
                resolve(null);
            }
        });

    }).catch((error) => {
        console.log(error);
    });


}

async function updateCredentials(discord_ID, access_Token, refresh_Token) {
    const connection = await database.getConnection();

    return new Promise((resolve, reject) => {


        let sql = `UPDATE Credentials SET Access_Token=?, Refresh_Token=? WHERE ID_User = ?;`;

        connection.query(sql, [access_Token,refresh_Token,discord_ID], (error) => {
            if (error) {
                console.error(error.message);
                reject(error)
            } else {
                console.log("Row Updated");
                resolve();
            }
        }

        )

    }).catch((error) => {
        console.log(error);
    });

}

async function deleteCredentials(id) {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {
        let sql = "DELETE FROM Credentials WHERE ID_User=?;";
        connection.query(sql, [id], (error, results) => {
            if (error){
                console.error(error.message);
                reject(error);
            }
            else {
                resolve();
                console.log("Row deleted");
            }
        });

    }).catch((error) => {
        console.log(error);
    });


}

module.exports = {
    getCredentials,
    createCredentials,
    updateCredentials,
    deleteCredentials
}
