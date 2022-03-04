/* setTimeout(function () {
  console.log("Hola mundo");
}, 1000);
 */

const getUsuarioByID = (id, callback) => {
  const user = {
    id,
    nombre: "Osmar",
  };

  setTimeout(() => {
    callback(user);
  }, 1500);
};

//envia 10 (id) y una funcion que recibe al usuario,
getUsuarioByID(10, (usuario) => {
  console.log(usuario.id);
  console.log(usuario.nombre.toUpperCase());
});
