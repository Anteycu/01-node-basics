const { Router } = require("express");
// const contactsFunctions = require("../contacts");

const ContactController = require("../controllers/contact.controller");

const router = Router();

router.get("/", ContactController.getContacts);
router.get("/:contactId", ContactController.getById);
router.post("/", ContactController.validateCreateContact, ContactController.createContact);
router.delete("/:id", ContactController.deleteContact);
router.patch("/:id", ContactController.validateUpdateContact, ContactController.updateContact);

module.exports = router;