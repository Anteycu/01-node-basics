const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const listContactContent = await fs.promises.readFile(contactsPath, "utf8")
  console.table(listContactContent)
}

async function getContactById(contactId) {
  const listContactContent = await fs.promises.readFile(contactsPath, "utf8");
  const filteredContact = JSON.parse(listContactContent).filter(obj => obj.id === contactId)
  console.log(filteredContact)
}

async function removeContact(contactId) {
  const listContactContent = await fs.promises.readFile(contactsPath, "utf8");
  const filteredContact = JSON.parse(listContactContent).filter(obj => obj.id !== contactId);
  const newContactsJson = JSON.stringify(filteredContact);
 await fs.promises.writeFile(contactsPath, newContactsJson);
  console.log(filteredContact)
}

async function addContact(name, email, phone) {
  const listContactContent = await fs.promises.readFile(contactsPath, "utf8");
  const listContactContentJS = JSON.parse(listContactContent);
  const addUserJs = [...listContactContentJS,
    {
    id: listContactContentJS.length+1,
    name: name,
    email: email,
    phone: phone
    }
  ]
  const newContactsJson = JSON.stringify(addUserJs);
 await fs.promises.writeFile(contactsPath, newContactsJson);
  const data = await fs.promises.readFile(contactsPath, "utf8")
  console.log(data)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};