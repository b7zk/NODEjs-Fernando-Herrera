const { v4: uuiv4 } = require("uuid");

class Tarea {
  /* id = "";
  desc = "";
  completado = null; */
  constructor(desc) {
    this.id = uuiv4();
    this.desc = desc;
    this.completado = null;
  }
}

module.exports = Tarea;
