const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/contact.routes")

const PORT = process.env.port || 8080;



class Server {
    constructor() {
        this.server = null;
    
}
    start() {
        this.server = express();
        this.initMiddleware();
        this.initRoutes();
        this.listen();
}
    
    initMiddleware() {
        this.server.use(express.json());
        this.server.use(cors({origin: "*",}));
    }

    initRoutes() {
        this.server.use('/api/contacts',userRouter);
    }
    
    listen() {
        this.server.listen(PORT, () => { console.log("Server is on, port:", PORT) });
    }
}

const server = new Server();
server.start();