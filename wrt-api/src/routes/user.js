const router = require("express").Router();
const { getUser, updateUser, deleteUser } = require("../controllers/user.js");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, `${__dirname}/../public/upload/images/banner`);
    },
    filename: function (request, file, callback) {
        let ID = request.query.id || request.user.id;
        callback(null, `${ID}.png`);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 20,
    },
});

router.get("/", getUser);
router.put("/", upload.single('image'), updateUser);
router.delete("/", deleteUser);


module.exports = router;