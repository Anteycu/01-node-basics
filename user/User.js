
const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: (value) => value.includes("@")
  },
  password: {
    type: String,
    required: true,
  },
  avatarURL: {
    type: String,
  },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free"
  },
  token: String,
  verificationToken: String,
})

const User = mongoose.model("User", UserSchema);
module.exports = User;