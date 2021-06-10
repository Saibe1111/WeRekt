const { getCoverURL } = require("../helpers/igdb.js");
const db = require("../models/userDAO.js");

async function getUser(req, res) {
    //await db.createUser(1, "steve", "https://images-ext-1.discordapp.net/external/GtvlXwMO1thEKkqVYnLBGlRW6Wfbbu3z7EemGmD9Egc/https/support.discord.com/system/photos/360198181611/profile_image_377013600211_678183.jpg");

    let ID = req.query.id;

    if(ID===undefined)
        ID = req.user.id;
    if(ID===null){
        res.status(404).json({msg:"ID cannot be null"});
        return;
    }


    let user = await db.getUser(ID);

    if(user===null){
        res.status(404).json({msg:"User not found"});
        return;
    }
        
    let User = {
        User_ID : ID,
        username: user.username,
        profile_url: user.profile_url,
        description: user.description,
        age: new Date(user.birthdate).getFullYear() - new Date().getFullYear(),
        country: user.country,
        games: [{
            name: "Among Us",
            cover_url: await getCoverURL("Among Us")
        }, {
            name: "Grand Theft Auto V",
            cover_url: await getCoverURL("Grand Theft Auto V")
        }, {
            name: "Minecraft",
            cover_url: await getCoverURL("Minecraft")
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
            name: "XBOX",
            username: "steve"

        }]

    }
    res.json(User);
}

module.exports = {
    getUser
}