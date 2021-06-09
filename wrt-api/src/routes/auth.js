const router = require("express").Router();
const auth = require("../controllers/auth.js");
const passport = require('passport');
const config = require("../config.json");

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: config.front.URL
}), auth.discordRedirect);

router.get('/logout', auth.logout);

router.get('/', auth.getAuth);

module.exports = router;