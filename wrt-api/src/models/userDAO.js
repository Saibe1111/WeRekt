const database = require('../helpers/database.js');

async function createUser(discord_ID, username, Profile_Url) {
    const connection = await database.getConnection();
    let Usname = username.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]/g, "");

        let sql = "INSERT INTO Users (ID, Username, Profile_Url,Languages,Platforms,Social_Networks)"+
        " values (?,?,?,JSON_OBJECT('Languages',JSON_ARRAY()),JSON_OBJECT('Platforms',JSON_ARRAY()),JSON_OBJECT('Social_Networks',JSON_ARRAY()));";

        connection.query(sql, [discord_ID, Usname, Profile_Url], (error) => {
            if (error) {
                console.error(error.message);

            } else {
                console.log("Row inserted");

            }
        });
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
                    birthdate: results[0].Birthdate,
                    banner:results[0].Banner,
                    languages:results[0].Languages,
                    platforms:results[0].Platforms,
                    social_networks:results[0].Social_Networks

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

async function updateUser(discord_ID, Username=undefined, Profile_Url=undefined,Description=undefined, 
    Country=undefined, Birthdate=undefined, Banner=undefined, Languages=undefined,Platforms=undefined,Social_Networks=undefined) {
    const connection = await database.getConnection();

    let param = [];
    let attributes = "";


    if(Username != undefined){
        let Usname = Username.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]/g, "");
        attributes = attributes + "Username=?, ";
        param.push(Usname);
    }
    if(Profile_Url != undefined){
        attributes = attributes + "Profile_Url=?, ";
        param.push(Profile_Url);
    }
    if(Description != undefined){
        attributes = attributes + "Description=?, ";
        param.push(Description);
    }
    if(Country != undefined){
        attributes = attributes + "Country=?, ";
        param.push(Country);
    }
    if(Birthdate != undefined){
        attributes = attributes + "Birthdate=str_to_date(?,'%Y-%m-%d'), ";
        param.push(Birthdate);
    }
    if(Banner != undefined){
        attributes = attributes + "Banner=?, "
        param.push(Banner);
    }
    if(Languages !=undefined){
      
        attributes = attributes + "Languages = JSON_SET(`Languages`,";
        for (var i = 0; i < Languages.length; i++) {
            attributes = attributes + `"$.Languages[${i}]",?, `;
            param.push(Languages[i]);
          }
          attributes = attributes.replace(/,\s*$/, "") + "), "

    }

    if(Platforms != undefined){
        attributes = attributes + "Platforms = JSON_SET(`Platforms`,";
        for (var i = 0; i < Platforms.length; i++) {
            attributes = attributes + `"$.Platforms[${i}]",JSON_OBJECT("name",?,"username",?), `;
            param.push(Platforms[i].name);
            param.push(Platforms[i].username);
          }
          attributes = attributes.replace(/,\s*$/, "") + "), "
    }

    if(Social_Networks !=undefined){
        console.log(Social_Networks);
        attributes = attributes + "Social_Networks = JSON_SET(`Social_Networks`, ";
        for (var i = 0; i < Social_Networks.length; i++) {
            attributes = attributes + `"$.Social_Networks[${i}]",JSON_OBJECT("name",?,"username",?), `;
            param.push(Social_Networks[i].name);
            param.push(Social_Networks[i].username);
          }
          attributes = attributes.replace(/,\s*$/, "") + "), "
    }

    param.push(discord_ID);

        let sql = `UPDATE Users SET ${attributes.replace(/,\s*$/, "")} WHERE ID = ?;`;
        console.log(sql);
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