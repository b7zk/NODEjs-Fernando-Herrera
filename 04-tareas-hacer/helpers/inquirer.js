const inquirer = require("inquirer");
const colors = require("colors");

const menuOps = [
  {
    type: "list",
    name: "opcion",
    messaje: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear una Tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar Tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar Tareas Completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar Tareas Pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar Tareas`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar Tareas`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

//LISTA DINAMICA BASADA EN ARREGLO
const listTasksD = async (tareas = []) => {
  const choices = tareas.map((t, i) => {
    const idx = i + 1;
    return {
      value: t.id,
      name: `${colors.green(idx)} ${t.desc}`,
    };
  });
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "DELETE A TASK",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const inquirerMenu = async () => {
  console.log("\n=====================".green);
  console.log("Seleccione una Opción");
  console.log("=====================\n".green);

  const { opcion } = await inquirer.prompt(menuOps);
  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor infrese un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};
const confirmar = async (mensaje) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      mensaje,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarCheckList = async (tareas = []) => {
  const choices = tareas.map((t, i) => {
    const idx = i + 1;
    return {
      value: t.id,
      name: `${colors.green(idx)} ${t.desc}`,
      checked: t.completado ? true : false,
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};
module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listTasksD,
  confirmar,
  mostrarCheckList,
};
