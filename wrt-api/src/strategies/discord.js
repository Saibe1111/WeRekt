const passport = require("passport");
const discordStrategy = require("passport-discord");
const config = require("../config.json");
const { createUser, getUser } = require("../models/userDAO");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUser(id);
        console.log(user);
        return user ? done(null, user) : done(null, null);
    } catch (error) {
        console.log(error);
        return done(error, null);
    }
});

passport.use(
    new discordStrategy(
        {
            clientID: config.discord.CLIENT_ID,
            clientSecret: config.discord.CLIENT_SECRET,
            callbackURL: config.discord.CALLBACK_URL,
            scope: ["identify"],
        },
        async (accessToken, refreshToken, profile, done) => {
            
            try {
                let user = await getUser(profile.id);
                if(user === null){
                    await createUser(profile.id, profile.username, `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`)
                    user  = await getUser(profile.id);
                }else{
                    //Si on trouve on update
                }
                console.log(user);
                return done(null, user);
            } catch (error) {
                console.log(error);
                return done(error, null);
            }
        }
    )
);
