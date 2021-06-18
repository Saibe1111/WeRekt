const router = require("express").Router();
const { isAuthorized } = require("../middlewares/auth.js");

const user = require("./user.js");
const auth = require("./auth.js");

router.use("/user", isAuthorized, user);
router.use("/auth", auth);

module.exports = router;