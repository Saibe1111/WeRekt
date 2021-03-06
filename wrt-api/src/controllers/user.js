const { updateUserWithDiscord } = require("../helpers/discordUser");
const db = require("../models/userDAO.js");
const config = require("../config.json");
const moment = require('moment');
const { getUserGames, updateUserGames } = require('../models/gameDAO.js');

async function getUser(req, res) {


    let ID = req.query.id || req.user?.id;

    if (ID === null) {
        res.status(404).json({ msg: "ID cannot be null" });
        return;
    }

    let user = await db.getUser(ID);

    if (user === null) {
        res.status(404).json({ msg: "User not found" });
        return;
    }

    if (user === undefined) {
        res.status(404).json({ msg: "User not found" });
    }
    await updateUserWithDiscord(ID);

    let bt = null;
    if (user.birthdate != null)
        bt = moment(user.birthdate).format('YYYY-MM-DD');

    let Igames = await getUserGames(ID);

    let User = {
        User_ID: ID,
        username: user.username,
        profile_url: user.profile_url,
        banner: user.banner,
        description: user.description,
        birthdate: bt,
        country: user.country,
        games: Igames,
        languages: user.languages.Languages,
        social_networks: user.social_networks.Social_Networks,
        platforms: user.platforms.Platforms,
    };

    res.json(User);
}

async function updateUser(req, res) {
    let username = req.body.username;
    let profile_url = req.body.profile_url;
    let description = req.body.description;
    let country = req.body.country;
    let birthdate = req.body.birthdate;
    let banner = `${config.api.URL}/public/upload/images/banner/${req.user.id}.png`;

    await updateUserGames(req.user.id, req.body.games);

    db.updateUser(
        req.user.id,
        username,
        profile_url,
        description,
        country,
        birthdate,
        banner,
        req.body.languages,
        req.body.platforms,
        req.body.social_networks
    );


    res.status(200).json({ msg: "ok" });
}

async function deleteUser(req, res) {
    await db.deleteUser(req.user.id);
    res.json({ message: "User has been deleted" });
}

module.exports = {
    getUser,
    updateUser,
    deleteUser,
};
