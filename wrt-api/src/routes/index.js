const router = require("express").Router();
const { isAuthorized } = require("../middlewares/auth.js");

const user = require("./user.js");
const auth = require("./auth.js");
const game = require("./game.js");

router.use("/user", isAuthorized, user);
router.use("/auth", auth);
router.use("/games", game);

module.exports = router;