require("dotenv").config();

const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

require("colors");
require("inquirer");

const main = async () => {
  let opt = "";
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Mostrar mensaje y recibir input (funcion de inquirer)
        const termino = await leerInput("Ciudad: ");

        //buscar los lugares
        const lugares = await busquedas.ciudad(termino);

        //seleccionar el lugar
        const id = await listarLugares(lugares);
        //cancela
        if (id === "0") continue;

        const lugarSeleccionado = lugares.find((l) => l.id === id);
        //agregar a historial
        busquedas.agregarHistorial(lugarSeleccionado.nombre);

        //mostrar datos del clima

        const clima = await busquedas.climaxLugar(
          lugarSeleccionado.latitud,
          lugarSeleccionado.longitud
        );
        //mostrar resultados
        console.log("\nInformación del lugar\n".green);
        console.log("Ciudad: ", lugarSeleccionado.nombre);
        console.log("Latitud: ", lugarSeleccionado.latitud);
        console.log("Longitud: ", lugarSeleccionado.longitud);
        console.log("Temperatura: ", clima.temp);
        console.log("Minima: ", clima.min);
        console.log("Maxima: ", clima.max);
        console.log("El clima esta: ", clima.desc);
        break;
      case 2:
        busquedas.historialCapitalizado.forEach((l, i) => {
          idx = `${i + 1}.`.green;
          console.log(`${idx} ${l}`);
        });

        break;
      case 0:
        console.log("Saliendo");
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
