const importChild = require("./contacts");
const argv = require('yargs').argv;
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      importChild.listContacts()
      break;

    case 'get':
      importChild.getContactById(id)
      break;

    case 'add':
      importChild.addContact(name,email, phone)
      break;

    case 'remove':
      importChild.removeContact(id)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
invokeAction(argv);