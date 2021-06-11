const database = require('../helpers/database.js');

async function createUser(discord_ID, username, Profile_Url) {
    const connection = await database.getConnection();
    let Usname = username.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]/g, "");
    return new Promise((resolve, reject) => {


        let sql = "INSERT INTO Users (ID, Username, Profile_Url) values (?,?,?);";

        connection.query(sql, [discord_ID, Usname, Profile_Url], (error) => {
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

async function getUser(id) {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM Users where ID=?;";
        connection.query(sql, [id], (error, results) => {
            if (error)
                console.error(error.message);

            if (results.length > 0) {
                resolve({ 
                    id: results[0].ID,
                    username: results[0].Username, 
                    profile_url: results[0].Profile_Url, 
                    description: results[0].Description, 
                    country: results[0].Country, 
                    birthdate: results[0].Birthdate 
                });
            } else {
                resolve(null);
            }
        });

    }).catch((error) => {
        console.log(error);
    });


}

async function updateUser(discord_ID, Username=undefined, Profile_Url=undefined,Description=undefined, Country=undefined, Birthdate=undefined) {
    const connection = await database.getConnection();

    let param = [];
    let usname = "";
    let purl = "";
    let desc = "";
    let cty = "";
    let bdate = "";

    if(Username != undefined){
        let Usname = Username.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]/g, "");
        usname = "Username=?, ";
        param.push(Usname);
    }
    if(Profile_Url != undefined){
        purl = "Profile_Url=?, ";
        param.push(Profile_Url);
    }
    if(Description != undefined){
        desc = "Description=?, ";
        param.push(Description);
    }
    if(Country != undefined){
        cty = "Country=?, ";
        param.push(Country);
    }
    if(Birthdate != undefined){
        bdate = "Birthdate=str_to_date(?,'%Y-%m-%d'), ";
        param.push(Birthdate);
    }

    param.push(discord_ID);

    let attributes = usname+purl+desc+cty+bdate;

    return new Promise((resolve, reject) => {


        let sql = `UPDATE Users SET ${attributes.replace(/,\s*$/, "")} WHERE ID = ?;`;

        connection.query(sql, param, (error) => {
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

async function deleteUser(id) {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {
        let sql = "DELETE FROM Users WHERE ID=?;";
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
    getUser,
    createUser,
    updateUser,
    deleteUser
}