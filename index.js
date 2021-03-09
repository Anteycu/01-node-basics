const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const contactRouter = require("./contact/contact.routes");
const userRouter = require("./user/user.routes");

dotenv.config();

const PORT = process.env.port || 8080;

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