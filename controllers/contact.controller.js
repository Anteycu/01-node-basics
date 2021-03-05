const contactsFunctions = require("../contacts");
const Joi = require("joi");

class ContactController{
    async getContacts(req, res) {
    res.send(await contactsFunctions.listContacts())
    }
    
    async getById(req, res) {
         const {
             params: { contactId },
         } = req;
        const id = parseInt(contactId);
        const filteredContacts = contactsFunctions.getContactById(id);
        if (await filteredContacts) {
            res.send(await filteredContacts)
        } else {
            res.status(404).send({ "message": "Not found" })
        }
    }

    async createContact(req, res) {
        const { body } = req;

        const createdContact = contactsFunctions.addContact(body.name, body.email, body.phone);

        res.status(201).send(await createdContact)
    }

    validateCreateContact(req, res, next) {
        const validationRules = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
        });

        const validationResult = validationRules.validate(req.body)
        
        if (validationResult.error) {
            return res.status(400).send({"message": "missing required name field"})
        }

        next();
    }

    async updateContact(req, res) {
        const { body } = req;
           const {
             params: { id },
         } = req;
        const contactId = parseInt(id);
        
        const updatedContact = contactsFunctions.updateContact(body, contactId)
        if (await updatedContact === -1) {
            const errorMessage = { "message": "Not found" }
           return res.status(404).send(errorMessage)
}
        res.send( await updatedContact)
    }

    validateUpdateContact(req, res, next) {
        const validationRules = Joi.object({
            name: Joi.string(),
            email: Joi.string(),
            phone: Joi.string(),
        });

        const validationResult = validationRules.validate(req.body)
        
        if (validationResult.error) {
            return res.status(400).send({"message": "missing fields"})
        }

        next();
    }

    async deleteContact(req, res) {
           const {
             params: { id },
         } = req;
        const contactId = parseInt(id);

        const deleteContact = contactsFunctions.removeContact(contactId)

        if ( await deleteContact === true) {
            const successMessage = { "message": "contact deleted" };
            res.send(successMessage)
        } else { const errorMessage = { "message": "Not found" }
        res.status(404).send(errorMessage)}
       
        
    }

}

module.exports = new ContactController();