const {
    Types: { ObjectId },
} = require("mongoose")
const Contact = require("./Contact");

async function getContacts(req, res) {
    const contacts = await Contact.find();
    res.json({contacts})
}
    
async function getById(req, res) {
         const {
             params: { id },
         } = req;
   const contact = await Contact.findById(id);
        if (!contact) {
        return res.status(404).send({ "message": "Not found" })
    }
    res.json(contact);
}

async function createContact(req, res) {
    try {
        const { body } = req;
        const createdContact = await Contact.create(body);
        res.status(201).json(createdContact)
    } catch (error) {
        res.status(400).send(error);
    }
    }

async function updateContact(req, res) {
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).send("Contact not found")
        }
        res.json(updatedContact)
    }

async function deleteContact(req, res) {
        const {
             params: { id },
    } = req;

        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
           return res.status(404).send("Not found")
        }
        res.json(deletedContact)
        
}
    
function validateId(req, res, next) {
    const {
             params: { id },
    } = req;
        if (!ObjectId.isValid(id)) {
            return res.status(400).send("Your id is not valid")
    }
    next();
}

module.exports = {
    getContacts,
    getById,
    createContact,
    updateContact,
    deleteContact,
    validateId
};