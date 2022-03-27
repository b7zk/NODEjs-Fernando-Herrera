//referencias html
const lblnuevoTicket = document.querySelector("#lblNuevoTicket");
const btnCrear = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
  // Si se conecta se muestra
  btnCrear.disabled = false;
});

socket.on("disconnect", () => {
  // Si el server esta desconectado no se podrá usar el botón
  btnCrear.disabled = true;
});

socket.on("ultimo-ticket", (ultimo) => {
  lblnuevoTicket.innerText = "Ticket " + ultimo;
});

btnCrear.addEventListener("click", () => {
  socket.emit("siguiente-ticket", null, (ticket) => {
    lblnuevoTicket.innerText = ticket;
  });
});
