const router = require("express").Router();
const auth = require("../controllers/auth.js");
const passport = require("passport");
const config = require("../config.json");
const { isAuthorized } = require("../middlewares/auth.js");

router.get("/discord", passport.authenticate("discord"));

router.get(
    "/discord/redirect",
    passport.authenticate("discord", {
        failureRedirect: config.front.URL,
    }),
    auth.discordRedirect
);

router.get("/logout", auth.logout);

router.get("/state", auth.state);

router.get("/", isAuthorized, auth.getAuth);

module.exports = router;
