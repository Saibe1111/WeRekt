const router = require("express").Router();
const { getUser, updateUser, deleteUser } = require("../controllers/user.js");
const { isAuthorized } = require("../middlewares/auth.js");

router.get("/", isAuthorized, getUser);
router.put("/", isAuthorized, updateUser);
router.delete("/", deleteUser);


module.exports = router;