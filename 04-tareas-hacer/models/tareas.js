const Tarea = require("./tarea");
const colors = require("colors");

class Tareas {
  constructor() {
    this._listado = {};
  }

  borrarTask(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
  toogleComplet(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completado) {
        tarea.completado = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((t) => {
      if (!ids.includes(t.id)) {
        this._listado[t.id].completado = null;
      }
    });
  }
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  cargarTareas(tareas = []) {
    tareas.forEach((t) => {
      this._listado[t.id] = t;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto(v = undefined) {
    let cont = 0;

    this.listadoArr.forEach((tarea, i) => {
      const { desc, completado } = tarea;
      let poC;

      if (completado === null) {
        poC = "pendiente".red;
      } else {
        poC = `${completado}`.green;
      }

      if (v === undefined) {
        console.log(`${colors.green(i + 1 + ".")} ${desc} :: ${poC}`);
      } else if (v === null) {
        if (completado === null) {
          cont++;
          console.log(`${colors.green(cont + ".")} ${desc} :: ${poC}`);
        }
      } else {
        if (completado !== null) {
          cont++;
          console.log(`${colors.green(cont + ".")} ${desc} :: ${poC}`);
        }
      }
    });
  }
}
/*   listarXpedido(v=true) {
    this.listadoArr.forEach((tarea, i) => {
      const { desc, completado } = tarea;
      let poC;
      if (completado === null) {
        poC = "pendiente".red;
      } else {
        poC = "completado".green;
      }
      if(v){
        if()
      }
    });
  }
} */

module.exports = Tareas;
