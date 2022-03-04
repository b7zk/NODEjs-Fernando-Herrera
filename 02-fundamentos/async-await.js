const empleados = [
  {
    id: 1,
    nombre: "Osmar",
  },
  {
    id: 2,
    nombre: "Linda",
  },
  {
    id: 3,
    nombre: "Raul",
  },
];

const salarios = [
  {
    id: 1,
    salario: 1000,
  },
  {
    id: 2,
    salario: 1500,
  },
];

const getEmpleado = (id) => {
  return (promesa = new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;
    empleado ? resolve(empleado) : reject(`No existe un empleado con id ${id}`);
  }));
};

const getSalario = (id) => {
  return (promesa = new Promise((resolve, reject) => {
    const salario = salarios.find((e) => e.id === id)?.salario;
    salario
      ? resolve(salario)
      : reject(`No existe el salario para el id: ${id}`);
  }));
};

const id = 3;

const getInfoUser = async (id) => {
  try {
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);

    return `El salario del empleado ${empleado} es ${salario}`;
  } catch (error) {
    //throw llama al reject de la async f
    throw error;
  }
};

getInfoUser(id)
  .then((msd) => {
    console.log("TODO BIEN");
    console.log(msd);
  })
  .catch((err) => {
    console.log("TODO MAL");
    console.log(err);
  });
