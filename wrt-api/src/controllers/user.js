const { getCoverURL } = require("../helpers/igdb.js");
const { updateUserWithDiscord } = require("../helpers/discordUser");
const db = require("../models/userDAO.js");

async function getUser(req, res) {
    
    let ID = req.query.id || req.user.id;

    if(ID===null){
        res.status(404).json({msg:"ID cannot be null"});
        return;
    }

    await updateUserWithDiscord(ID);

    let user = await db.getUser(ID);

    if(user===null){
        res.status(404).json({msg:"User not found"});
        return;
    }

    let ageOf = null;

    if(user.birthdate != null)
        ageOf = moment(user.birthdate, "YYYY-MM-DD").fromNow();
        
    let User = {
        User_ID : ID,
        username: user.username,
        profile_url: user.profile_url,
        description: user.description,
        age: ageOf,
        country: user.country,
        games: [{
            name: "Among Us",
            cover_url: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1uaf.jpg"
        }, {
            name: "Grand Theft Auto V",
            cover_url: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg"
        }, {
            name: "Minecraft",
            cover_url: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2b4k.jpg"
        }],
        languages: ["French", "English"],
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

async function updateUser(req, res){

    let username = req.query.username;
    let profile_url = req.query.profile_url;
    let description = req.query.description;
    let country = req.query.country;
    let birthdate = req.query.birthdate;
    
    db.updateUser(req.user.id, username,profile_url,description,country,birthdate);
    
}

async function deleteUser(req, res){
    await db.deleteUser(req.user.id);
    res.json({message:"User has been deleted"});
}

module.exports = {
    getUser,
    updateUser,
    deleteUser
}