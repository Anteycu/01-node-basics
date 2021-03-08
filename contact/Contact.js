
const mongoose = require("mongoose");

const { Schema } = mongoose;
const { SchemaTypes } = mongoose;

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
  owner: [{
      type: SchemaTypes.ObjectId,
      ref: 'User',
  },
]
})

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;