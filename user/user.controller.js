const {
    Types: { ObjectId },
} = require("mongoose")
const User = require("./User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const gravatar = require('gravatar');

dotenv.config();

async function getUsers(req, res) {
    // const currentUser = req.user;
    const users = await User.find();
    res.json({users})
}

async function createUser(req, res) {
    try {
    const { email, password } = req.body;
    const sameUser = await User.findOne({email})
        if (sameUser) {
            return res.status(409).send('email in use')
        }
        
        const avatarURL = gravatar.url('emerleite@gmail.com', {s: '100', r: 'x', d: 'retro'}, false);
        const hashedPassword = await bcrypt.hash(password, 14);
        const createdUser = await User.create({
            email,
            password: hashedPassword,
            avatarURL,
        });
        res.status(201).json({ subscription: createdUser.subscription, email: createdUser.email, avatarURL })
    } catch (error) {
        res.status(400).send(error);
    }
}

async function login (req, res) {
    const {
        body: { email, password }
    } = req;

    const user = await User.findOne({
        email,
    });
    if (!user) {
        return res.status(401).send("Email or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send("Email or password is wrong");
    }

      const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 1000,
    }
  );
    
await User.findByIdAndUpdate(user._id, { $set: { token }, }, { new: true });
res.status(200).send({
    token,
    user: {
        email: user.email,
        subscription: user.subscription
        }
    })
}

async function logout(req, res) {
        const { _id } = req.user
        await User.findByIdAndUpdate(_id, { $set: { token: "" } })
    return res.status(204).send();
}

async function authorize(req, res, next) {
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) {
        return res.status(401).send({ "message": "Not authorized" });
    }
    const token = authorizationHeader.replace("Bearer ", "");
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        const { userId } = payload;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).send({"message": "Not authorized"})
        }

        req.user = user;
next();
    } catch (error) {
        return res.status(401).send(error);
    }
}

async function avatar(req, res) {

    const { user } = req;
    const { file } = req;

    const imageURL = `http://localhost:8080/images/${file.filename}`;
    const updatedImage = await User.findByIdAndUpdate(user._id, { avatarURL: imageURL, }, { new: true });
    return res.status(200).send({ avatarURL: updatedImage.avatarURL })
}


module.exports = {
    getUsers,
    createUser,
    login,
    logout,
    authorize,
    avatar,
};