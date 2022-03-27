//referencias del HTML
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");

const socketCliente = io();
//.on() para escuchar evento
socketCliente.on("connect", () => {
  /* console.log("Conectado"); */
  //llamar
  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});
socketCliente.on("disconnect", () => {
  /* console.log("Desconectado del server"); */
  //llamar al html
  lblOffline.style.display = "";
  lblOnline.style.display = "none";
});

//recibe el mensaje emitido a todos
socketCliente.on("enviar-mensaje", (payload) => {
  //callback
  console.log(payload);
});
//emision desde cliente
btnEnviar.addEventListener("click", () => {
  const mensaje = txtMensaje.value;
  const payload = {
    mensaje,
    id: "uuid123",
    fecha: new Date().getTime(),
  };
  //emitir evento
  socketCliente.emit("enviar-mensaje", payload, (id) => {
    console.log("desde el server:", id);
  });
});
