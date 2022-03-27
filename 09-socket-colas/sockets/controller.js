const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  //cuando se conecta el socket
  socket.emit("ultimo-ticket", ticketControl.ultimo);
  socket.emit("estado-actual", ticketControl.ultimos4); //emite los ultimos 4
  socket.emit("tickets-pendientes", ticketControl.tickets.length); //se debe disparar tambien cuando se atienda

  socket.on("siguiente-ticket", (payload, callback) => {
    const siguiente = ticketControl.siguiente();
    callback(siguiente);
    //se emite a los esctorios los faltantes al crear un nuevo ticket:
    socket.broadcast.emit("tickets-pendientes", ticketControl.tickets.length);
  });

  socket.on("atender-ticket", ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: "El escritorio es necesario",
      });
    }

    const ticket = ticketControl.atenderTicket(escritorio);
    //Cambiaron los ultimos 4
    socket.broadcast.emit("estado-actual", ticketControl.ultimos4); //emite los ultimos 4

    //el primero emite al sicket que manda, el segundo a los demas
    //emite cuantos tickets faltan (escritorio)
    socket.emit("tickets-pendientes", ticketControl.tickets.length);
    socket.broadcast.emit("tickets-pendientes", ticketControl.tickets.length);

    if (!ticket) {
      callback({
        ok: false,
        msg: "No hay tickets pendientes",
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};
