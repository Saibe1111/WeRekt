const router = require("express").Router();

const{ getGames, getTop50, getAGameByName, getListGame } = require('../controllers/game.js');

router.get("/", getGames);
router.get("/top", getTop50);
router.get("/name", getAGameByName);
router.get("/list", getListGame)

module.exports = router;