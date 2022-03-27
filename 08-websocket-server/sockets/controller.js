const socketController = (socket) => {
  console.log("cliente conectado", socket.id);
  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });

  socket.on("enviar-mensaje", (payload, callback) => {
    //esperando id, se hace peticion por websockets
    const id = 123456;
    callback(id);
    /* callback( {   id , fecha: new Date().getTime() } ); */

    //mensaje a todos los clientes conectados:
    socket.broadcast.emit("enviar-mensaje", payload);
  });
};
module.exports = {
  socketController,
};
