const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/user.js");
const { isAuthorized } = require("../middlewares/auth.js");

router.get("/", isAuthorized, getUser);
router.put("/update", updateUser);


module.exports = router;