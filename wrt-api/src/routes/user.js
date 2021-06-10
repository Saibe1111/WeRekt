const router = require("express").Router();
const { getUser } = require("../controllers/user.js");
const { isAuthorized } = require("../middlewares/auth.js");

router.get("/", isAuthorized, getUser);



module.exports = router;