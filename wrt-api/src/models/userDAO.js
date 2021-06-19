const database = require('../helpers/database.js');

async function createUser(discord_ID, username, Profile_Url) {
    const connection = await database.getConnection();
    let Usname = username.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]/g, "");



        let sql = "INSERT INTO Users (ID, Username, Profile_Url) values (?,?,?);";

        connection.query(sql, [discord_ID, Usname, Profile_Url], (error) => {
            if (error) {
                console.error(error.message);

            } else {
                console.log("Row inserted");

            }
        }

        )
        connection.end();
}

async function getUser(id) {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM Users where ID=?;";
        connection.query(sql, [id], (error, results) => {
            if (error)
                console.error(error.message);
            if(results === undefined){
                resolve(null);
            }else if(results.length > 0){
                resolve({ 
                    id: results[0].ID,
                    username: results[0].Username, 
                    profile_url: results[0].Profile_Url, 
                    description: results[0].Description, 
                    country: results[0].Country, 
                    birthdate: results[0].Birthdate 
                });
            }else{
                resolve(null);
            }
            connection.end();
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




        let sql = `UPDATE Users SET ${attributes.replace(/,\s*$/, "")} WHERE ID = ?;`;

        connection.query(sql, param, (error) => {
            if (error) {
                console.error(error.message);
                return;
            } else {
                console.log("Row Updated");

            }
        }

        )
        connection.end();

}

async function deleteUser(id) {
    const connection = await database.getConnection();

        let sql = "DELETE FROM Users WHERE ID=?;";
        connection.query(sql, [id], (error, results) => {
            if (error){
                console.error(error.message);
                return;
            }
            else {
                console.log("Row deleted");
            }
        });
        connection.end();

}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}