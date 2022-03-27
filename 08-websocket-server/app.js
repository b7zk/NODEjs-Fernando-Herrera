require("dotenv").config(); //para poder usar variables de entorno .env

const Server = require("./models/server"); //server

const server = new Server();

server.listen();
