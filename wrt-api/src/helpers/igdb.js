const { response } = require("express");
const config = require("../config.json");
const fetch = require("node-fetch");

async function getCoverID(game_name) {

    const response = await fetch(`${config.igdb_api.URL}games`, {
        method: 'POST',
        headers: {

            'Client-ID': config.igdb_api.CLIENT_ID,
            'Authorization': 'Bearer ' + config.igdb_api.AUTHORIZATION
        },
        body: `fields cover; where name = "${game_name}";`
    }).then(
        response => response.json()
    ).then(function (data) {
        if (data[0].id === null)
            throw "This game doesn't exist";
        return data[0].cover;
    });
    return response;


}

async function getCoverURLName(game_name) {
   
    const response = await fetch(`${config.igdb_api.URL}covers`, {
        method: 'POST',
        headers: {

            'Client-ID': config.igdb_api.CLIENT_ID,
            'Authorization': 'Bearer ' + config.igdb_api.AUTHORIZATION
        },
        body: `fields image_id; where id = ${await getCoverID(game_name)};`
    }).then(
        response => response.json()
    ).then(function (data) {
        return data[0].image_id;
    });
    return `https://images.igdb.com/igdb/image/upload/t_cover_big/${await response}.jpg`;
}

async function getCoverURL(cover_id) {

    const response = await fetch(`${config.igdb_api.URL}covers`, {
        method: 'POST',
        headers: {

            'Client-ID': config.igdb_api.CLIENT_ID,
            'Authorization': 'Bearer ' + config.igdb_api.AUTHORIZATION
        },
        body: `fields image_id; where id = ${cover_id};`
    }).then(
        response => response.json()
    ).then(function (data) {
        return data[0].image_id;
    });
    return `https://images.igdb.com/igdb/image/upload/t_cover_big/${await response}.jpg`;
}

async function getTop(Nbr_Games) {
    let ret = [];
    const response = await fetch(`${config.igdb_api.URL}games`, {
        method: 'POST',
        headers: {

            'Client-ID': config.igdb_api.CLIENT_ID,
            'Authorization': 'Bearer ' + config.igdb_api.AUTHORIZATION
        },
        body: `fields name, cover; where total_rating_count > 20 & multiplayer_modes > 2; sort total_rating desc; limit ${Nbr_Games};`
    }).then(
        response => response.json()
    ).then(function (data) {
        
        return data;
    });
    

    for(var i = 0; i<response.length;i++){
        c = await getCoverURL(response[i].cover);

        ret.push({
            name: response[i].name,
            cover: c
        })
    }
    return ret;

}

async function getListGames() {

    const response = await fetch(`${config.igdb_api.URL}games`, {
        method: 'POST',
        headers: {

            'Client-ID': config.igdb_api.CLIENT_ID,
            'Authorization': 'Bearer ' + config.igdb_api.AUTHORIZATION
        },
        body: `fields name; where total_rating_count > 20 & multiplayer_modes > 2; sort total_rating desc; limit ${config.igdb_api.GAMES_LIMIT};`
    }).then(
        response => response.json()
    ).then(function (data) {
        return data;
    });
    let ret = [];

    Array.prototype.forEach.call(response, res =>{
        ret.push(res.name);
    })
    return ret;
}

module.exports = {
    getCoverURLName,
    getTop,
    getListGames
}