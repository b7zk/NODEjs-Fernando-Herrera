const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app); //importacion paquete para socketio

    this.io = require("socket.io")(this.server);
    //paginas (paths)
    this.paths = {};

    //Middleware es una funcion que se ejecuta antes de llamar a un controlador o la ejecucion de peticiones
    this.middlewares();
    //Rutas de la aplicacion
    this.routes();

    //configuracion de sockets
    this.sockets();
  }

  middlewares() {
    //.use (es un middleware)
    this.app.use(cors()); //cors
    this.app.use(express.static("public")); //directorio Public
  }
  routes() {
    //this.app.use(this.paths.auth, require("../routes/auth")); //define ruta
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
