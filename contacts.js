const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const listContactContent = await fs.promises.readFile(contactsPath, "utf8");
  return listContactContent;
}

async function getContactById(contactId) {
  const listContactContent = await fs.promises.readFile(contactsPath, "utf8");
  const filteredContact = JSON.parse(listContactContent).filter(obj => obj.id === contactId)
  return filteredContact[0]
}

async function removeContact(contactId) {
  const listContactContent = await fs.promises.readFile(contactsPath, "utf8");
  const listContactContentJS = JSON.parse(listContactContent);
  const filteredContact = listContactContentJS.filter(obj => obj.id !== contactId);
  const newContactsJson = JSON.stringify(filteredContact);
  if (listContactContentJS.length > filteredContact.length) {
    await fs.promises.writeFile(contactsPath, newContactsJson);
    return true
  }
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
  const filteredData = JSON.parse(data).filter(obj => obj.id > listContactContentJS.length)
  return filteredData
}

async function updateContact(body, contactId) {
  const listContactContent = await fs.promises.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(listContactContent);
  const contactIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactIndex === -1) {
    return contactIndex
  }
  const patchedContact = {
    ...contacts[contactIndex],
    ...body
  }
  contacts[contactIndex] = patchedContact;
  const newContactsJson = JSON.stringify(contacts);
 await fs.promises.writeFile(contactsPath, newContactsJson);
  return patchedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};