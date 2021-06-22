const router = require("express").Router();

const{ getGames, getTop50, getAGameByName } = require('../controllers/game.js');

router.get("/", getGames);
router.get("/top", getTop50);
router.get("/name", getAGameByName);

module.exports = router;