const { Router } = require("express");
const multer = require("multer");
const path = require('path');
const UserController = require("./user.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/');
  },
    filename: function (req, file, cb) {
    const { ext } = path.parse(file.originalname);
        cb(null, `${Date.now()}${ext}`);
        console.log(ext)
  },
});

const upload = multer({storage})

const router = Router();

router.post("/auth/register", UserController.createUser);
router.post("/auth/login", UserController.login);
router.post("/auth/logout", UserController.authorize, UserController.logout);
router.get("/current", UserController.authorize, UserController.getUsers);
router.patch("/avatars", UserController.authorize, upload.single("avatarURL"), UserController.avatar);

module.exports = router;