const { Router } = require("express");
const UserController = require("./user.controller");

const router = Router();

router.post("/auth/register", UserController.createUser);
router.post("/auth/login", UserController.login);
router.post("/auth/logout", UserController.authorize, UserController.logout);
router.get("/current", UserController.authorize, UserController.getUsers);

module.exports = router;