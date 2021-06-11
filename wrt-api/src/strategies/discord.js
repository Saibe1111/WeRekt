const passport = require("passport");
const discordStrategy = require("passport-discord");
const config = require("../config.json");
const {encrypt} = require('../helpers/crypto.js')
const { createUser, getUser, updateUser } = require("../models/userDAO");
const { createCredentials, updateCredentials } = require("../models/credentialsDAO");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUser(id);
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
            const encryptedAccessToken = encrypt(accessToken).toString();
            const encryptedRefreshToken = encrypt(refreshToken).toString();
            try {
                let user = await getUser(profile.id);
                if(user === null){
                    await createUser(profile.id, profile.username, `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`);
                    user  = await getUser(profile.id);
                    await createCredentials(profile.id, encryptedAccessToken, encryptedRefreshToken);
                }else{
                    await updateUser(profile.id, profile.username, `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`);
                    user  = await getUser(profile.id);
                    await updateCredentials(profile.id, encryptedAccessToken, encryptedRefreshToken);
                }
                return done(null, user);
            } catch (error) {
                console.log(error);
                return done(error, null);
            }
        }
    )
);
