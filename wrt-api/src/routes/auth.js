const router = require("express").Router();
const auth = require("../controllers/auth.js");
const passport = require('passport');

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/redirect', passport.authenticate('discord'), auth.discordRedirect);

router.get('/', auth.getAuth);

module.exports = router;