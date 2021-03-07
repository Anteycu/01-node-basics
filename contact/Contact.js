// const fs = require("fs");
// const path = require("path");
const mongoose = require("mongoose");
// const { string } = require("joi");

const { Schema } = mongoose;

// const contactsPath = path.join(__dirname, "./db/contacts.json");

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => value.includes("@")
  },
  phone: {
    type: String,
    required: true,
  },

})

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;