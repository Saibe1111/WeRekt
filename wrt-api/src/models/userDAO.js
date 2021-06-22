const database = require('../helpers/database.js');

async function createUser(discord_ID, username, Profile_Url) {
    const connection = await database.getConnection();
    let Usname = username.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]/g, "");

    let sql = "INSERT INTO Users (ID, Username, Profile_Url,Languages,Platforms,Social_Networks)" +
        " values (?,?,?,JSON_OBJECT('Languages',JSON_ARRAY()),JSON_OBJECT('Platforms',JSON_ARRAY()),JSON_OBJECT('Social_Networks',JSON_ARRAY()));";
    return new Promise((resolve, reject) => {
        connection.query(sql, [discord_ID, Usname, Profile_Url], (error) => {
            if (error) {
                console.error(error.message);
                reject(error);

            } else {
                resolve();

            }
        });
        connection.end();
    });
}

async function getUser(id) {
    const connection = await database.getConnection();
    return new Promise((resolve, reject) => {

        let sql = "SELECT * FROM Users where ID=?;";
        connection.query(sql, [id], (error, results) => {
            if (error)
                console.error(error.message);
            if (results === undefined) {
                resolve(null);
            } else if (results.length > 0) {

                resolve({
                    id: results[0].ID,
                    username: results[0].Username,
                    profile_url: results[0].Profile_Url,
                    description: results[0].Description,
                    country: results[0].Country,
                    birthdate: results[0].Birthdate,
                    banner: results[0].Banner,
                    languages: results[0].Languages,
                    platforms: results[0].Platforms,
                    social_networks: results[0].Social_Networks

                });
            } else {
                resolve(null);
            }
            connection.end();
        });

    }).catch((error) => {
        console.error(error.message);
    });


}

async function updateUser(discord_ID, Username = undefined, Profile_Url = undefined, Description = undefined,
    Country = undefined, Birthdate = undefined, Banner = undefined, Languages = undefined, Platforms = undefined, Social_Networks = undefined) {
    const connection = await database.getConnection();

    let param = [];
    let attributes = "";

    if (Username != undefined && Username != "") {
        let Usname = Username.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]/g, "");
        attributes = attributes + "Username=?, ";
        param.push(Usname);
    }
    if (Profile_Url != undefined && Profile_Url != "") {
        attributes = attributes + "Profile_Url=?, ";
        param.push(Profile_Url);
    }
    if (Description != undefined) {
        attributes = attributes + "Description=?, ";
        if (Description != "") {            
            param.push(Description);
        }else{
            param.push(null);
        }

    }
    if (Country != undefined && Country != "") {
        attributes = attributes + "Country=?, ";
        param.push(Country);
    }
    if (Birthdate != undefined && Birthdate != "null") {
        attributes = attributes + "Birthdate=str_to_date(?,'%Y-%m-%d'), ";
        param.push(Birthdate);
    }
    if (Banner != undefined && Banner != "") {
        attributes = attributes + "Banner=?, "
        param.push(Banner);
    }
    if (Languages != undefined) {

        attributes = attributes + "Languages = JSON_SET(`Languages`,";
        let LG = JSON.parse(Languages)
        for (var i = 0; i < LG.languages.length; i++) {
            attributes = attributes + `"$.Languages[${i}]",?, `;
            param.push(LG.languages[i]);
        }

        if (LG.languages.length == 0) {
            attributes += `"$.Languages",JSON_ARRAY(), `
        }
        attributes = attributes.replace(/,\s*$/, "") + "), "


    }

    if (Platforms != undefined) {
        attributes = attributes + "Platforms = JSON_SET(`Platforms`,";
        let PLT = JSON.parse(Platforms);
        for (var i = 0; i < PLT.platforms.length; i++) {
            attributes = attributes + `"$.Platforms[${i}]",JSON_OBJECT("name",?,"username",?), `;
            param.push(PLT.platforms[i].name);
            param.push(PLT.platforms[i].username);
        }
        if (PLT.platforms.length == 0) {
            attributes += `"$.Platforms",JSON_ARRAY(), `
        }
        attributes = attributes.replace(/,\s*$/, "") + "), "
    }

    if (Social_Networks != undefined) {

        attributes = attributes + "Social_Networks = JSON_SET(`Social_Networks`, ";
        let SN = JSON.parse(Social_Networks);
        for (var i = 0; i < SN.social_networks.length; i++) {
            attributes = attributes + `"$.Social_Networks[${i}]",JSON_OBJECT("name",?,"username",?), `;
            param.push(SN.social_networks[i].name);
            param.push(SN.social_networks[i].username);
        }
        if (SN.social_networks.length == 0) {
            attributes += `"$.Social_Networks",JSON_ARRAY(), `
        }
        attributes = attributes.replace(/,\s*$/, "") + "), "
    }

    param.push(discord_ID);

    let sql = `UPDATE Users SET ${attributes.replace(/,\s*$/, "")} WHERE ID = ?;`;
    connection.query(sql, param, (error) => {
        if (error) {
            console.error(error.message);
            return;
        } else {

        }
    }

    )
    connection.end();

}

async function deleteUser(id) {
    const connection = await database.getConnection();

    let sql = "DELETE FROM Users WHERE ID=?;";
    connection.query(sql, [id], (error, results) => {
        if (error) {
            console.error(error.message);
            return;
        }
        else {
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