function getUser(req, res) {

    let username = req.query.username;        
    let User = {
        username: username,
        profile_url: "https://images-ext-1.discordapp.net/external/GtvlXwMO1thEKkqVYnLBGlRW6Wfbbu3z7EemGmD9Egc/https/support.discord.com/system/photos/360198181611/profile_image_377013600211_678183.jpg",
        description: "I'm a gamer!",
        age:20,
        country:"France",
        games: ["AmongUs", "GTA5", "Rocket League"],
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