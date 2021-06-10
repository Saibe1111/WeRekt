const database = require('../helpers/database.js');

async function getUser(id) {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {

        

        let sql = "SELECT * FROM Users where ID=?;";
        connection.query(sql, [id], (error, results) => {
            if (error)
                console.error(error.message);

            if (results) {
                resolve({ username: results.Username, profile_url: results.Profile_Url, description: results.Description, country: results.Country, birthdate: results.Birthdate });
            } else {
                resolve(null);
            }
        }

        )

    }).catch((error) => {
        console.log(error);
    });


}

async function createUser(discord_ID, name, Profile_Url) {
    const connection = await database.getConnection();

    return new Promise((resolve, reject) => {


        let sql = "INSERT INTO Users (ID, Username, Profile_Url) values (?,?,?);";

        connection.query(sql, [discord_ID, name, Profile_Url], (error) => {
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

module.exports = {
    getUser,
    createUser
}