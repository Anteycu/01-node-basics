const {
    Types: { ObjectId },
} = require("mongoose")
const Contact = require("./Contact");
const User = require("../user/User");

async function getContacts(req, res) {
    const currentUser = req.user;
    console.log(currentUser)
    const contacts = await Contact.aggregate([{
        $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
        }
    }]);
    res.json({contacts})
}
    
async function getById(req, res) {
         const {
             params: { id },
         } = req;
    const contact = await (await Contact.findById(id)).populate("owner");
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

async function createContactOwner(req, res) {
    const {
             params: { id },
    } = req;

    const user = await User.create(req.body);

    const contact = await Contact.findByIdAndUpdate(
        id,
        {
        $push: {
            owner: user._id,
        },
    },
    {
        new: true
    });
        if (!contact) {
            return res.status(404).send("Contact not found")
        }
        res.json(contact)
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
    validateId,
    createContactOwner
};