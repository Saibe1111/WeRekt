const passport = require("passport");
const discordStrategy = require("passport-discord");
const config = require("../config.json");

passport.serializeUser((user, done) => {
    done(null, user.discordId);
});

passport.deserializeUser(async (discordId, done) => {
    try {
        const user = {
            discordId: "181782320494280704",
            username: "Sébastien",
        }; // On cherche dans la base de donnée , si pas trouvé = null

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
            console.log(profile);
            let user = {
                discordId: profile.id,
                username: profile.username,
            };

            try {
                //On cherche un utilisateur,
                //Si on trouve on update
                //return done(null, user);
                //Si on trouve pas on le créer
                return done(null, user);
            } catch (error) {
                console.log(error);
                return done(error, null);
            }
        }
    )
);
