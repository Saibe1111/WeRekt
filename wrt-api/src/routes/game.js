const router = require("express").Router();

const{ getGames } = require('../controllers/game.js');

router.get("/", getGames);

module.exports = router;