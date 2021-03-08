const { Router } = require("express");
const ContactController = require("./contact.controller");
const UserController = require("../user/user.controller");

const router = Router();

router.get("/", UserController.authorize, ContactController.getContacts);
router.get("/:id", ContactController.validateId, ContactController.getById);
router.post("/", ContactController.createContact);
router.delete("/:id", ContactController.validateId, ContactController.deleteContact);
router.patch("/:id", ContactController.validateId, ContactController.updateContact);
router.post("/:id/users", ContactController.validateId, ContactController.createContactOwner);

module.exports = router;