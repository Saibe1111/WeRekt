const router = require("express").Router();
const { getUser } = require("../controllers/user.js");

router.get("/", getUser);



module.exports = router;