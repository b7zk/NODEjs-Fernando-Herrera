//IMPORTAR
require("colors");
//DESTRUCTURAR (SACAR) DE INQUIRER
const {
  inquirerMenu,
  pausa,
  leerInput,
  listTasksD,
  confirmar,
  mostrarCheckList,
} = require("./helpers/inquirer");
const { guardarDB, leerDB } = require("./helpers/saveFile");
//IMPORTAR
const Tareas = require("./models/tareas");

//MAIN
const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareas(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción: ");

        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listadoCompleto(true);
        break;
      case "4":
        tareas.listadoCompleto(null);
        break;
      case "5":
        const ids = await mostrarCheckList(tareas.listadoArr);
        tareas.toogleComplet(ids);
        break;
      case "6":
        const id = await listTasksD(tareas.listadoArr);
        if (id !== 0) {
          const ok = await confirmar("Estás seguro?");
          if (ok) {
            tareas.borrarTask(id);
            console.log("Tarea borrada correctamente");
          }
        }

        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
