const { getCoverURL } = require("../helpers/igdb.js");
const db = require("../models/userDAO.js");

async function getUser(req, res) {
    await db.createUser(1, "steve", "https://images-ext-1.discordapp.net/external/GtvlXwMO1thEKkqVYnLBGlRW6Wfbbu3z7EemGmD9Egc/https/support.discord.com/system/photos/360198181611/profile_image_377013600211_678183.jpg");
    let user = await db.getUser(1)
    let usernameO = user.username;    
    var ageOf = new Date(user.birthdate).getFullYear - new Date().getFullYear;    
    let User = {
        username: usernameO,
        profile_url: user.profile_url,
        description: null,
        age:ageOf,
        country:user.country,
        games: [{
            name:"Among Us",
            cover_url:await getCoverURL("Among Us")
        }, {
            name:"Grand Theft Auto V",
            cover_url:await getCoverURL("Grand Theft Auto V")
        }, {
            name:"Minecraft",
            cover_url:await getCoverURL("Minecraft")
        }],
        languages: ["Français", "Anglais"],
        social_medias: [{
            name: "Instagram",
            username: "@Steve"
        },
        {
            name: "Twitter",
            username: "@Steve"
        }
        ],
        platforms: [{
            name: "PSN",
            username: "steve"
        },
        {
            name:"XBOX",
            username:"steve"

        }]

    }
    res.json(User);
}

module.exports = {
    getUser
}