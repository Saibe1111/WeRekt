const {decrypt} = require("./crypto.js");
const { getCredentials } = require("../models/credentialsDAO");
const { updateUser } = require("../models/userDAO");
const fetch = require("node-fetch");

async function updateUserWithDiscord(id) {
    const crendentials = await getCredentials(id);

    await fetch(`https://discord.com/api/v9/users/@me`, {
        method: 'GET',
        headers:{
            'Authorization':`Bearer ${decrypt(crendentials.access_token)}` 
        }
    }).then(
        response => response.json()
    ).then(async function(data){
        await updateUser(data.id, data.username, `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`);
    });
}

module.exports = {
    updateUserWithDiscord
}