const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const contactRouter = require("./contact/contact.routes");
const userRouter = require("./user/user.routes");
const multer = require("multer");
const path = require('path');

dotenv.config();

const PORT = process.env.port || 8080;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/');
  },
    filename: function (req, file, cb) {
    const { ext } = path.parse(file.originalname);
        cb(null, `${Date.now()}${ext}`);
        console.log(ext)
  },
});

const upload = multer({storage})

start();

function start() {
    const app = initServer();
    connectMiddlewares(app);
    connectRoutes(app);
    connectToDb();
    listen(app);
}

function initServer() {
    return express();
}

function connectMiddlewares(app) {
    app.use(express.json());
    app.use(express.static('public'));
}

function connectRoutes(app) {
    app.use('/api/contacts', contactRouter);
    app.use("/api/users", userRouter);
    app.post("/images", upload.single("userAvatar"), (req, res) => {
        // console.log(req.file);
        // console.log(req.body);
        res.send({ file: req.file, ...req.body });
    })
}

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database connection successful")
    } catch (error) {
        console.log(error.codeName)
        process.exit(1);
    }
}

function listen(app) {
    app.listen(PORT, () => {console.log("Server is listening on port", PORT)})
}