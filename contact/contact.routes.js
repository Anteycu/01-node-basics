const { Router } = require("express");
const ContactController = require("./contact.controller");

const router = Router();

router.get("/", ContactController.getContacts);
router.get("/:id", ContactController.validateId, ContactController.getById);
router.post("/", ContactController.createContact);
router.delete("/:id", ContactController.validateId, ContactController.deleteContact);
router.patch("/:id", ContactController.validateId, ContactController.updateContact);

module.exports = router;