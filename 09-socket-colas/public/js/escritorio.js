//referencias html
const lblEscritorio = document.querySelector("h1");
const btbAtender = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlerta = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");
lblEscritorio.innerHTML = escritorio;

divAlerta.style.display = "none";

const socket = io();

socket.on("connect", () => {
  // Si se conecta se muestra
  btbAtender.disabled = false;
});

socket.on("disconnect", () => {
  // Si el server esta desconectado no se podrá usar el botón
  btbAtender.disabled = true;
});
//tickets pendientes

/* socket.on("tickets-pendientes",); */
socket.on("tickets-pendientes", (pendientes) => {
  if (pendientes === 0) {
    lblPendientes.style.display = "none";
  } else {
    lblPendientes.style.display = "";
    lblPendientes.innerText = pendientes;
  }
});

btbAtender.addEventListener("click", () => {
  socket.emit("atender-ticket", { escritorio }, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = `Nadie`;
      return (divAlerta.style.display = "");
    }
    lblTicket.innerText = `Ticket ${ticket.numero}`;
  });
  /* socket.emit("siguiente-ticket", null, (ticket) => {
    lblnuevoTicket.innerText = ticket;
  }); */
});
