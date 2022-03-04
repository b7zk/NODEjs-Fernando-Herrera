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
    //operador ternario
    empleado ? resolve(empleado) : reject(`No existe un empleado con id ${id}`);

    /* if (empleado) {
      resolve(empleado);
    } else {
      reject(`No existe un empleado con id ${id}`);
    } */
  }));
};
//TAREA:

const getSalario = (id) => {
  return (promesa = new Promise((resolve, reject) => {
    const salario = salarios.find((e) => e.id === id)?.salario;
    salario
      ? resolve(salario)
      : reject(`No existe el salario para el id: ${id}`);
  }));
};
const id = 30;

/* getEmpleado(id)
  .then((empleado) => console.log(empleado))
  .catch((err) => console.log(err));

getSalario(id)
  .then((salario) => console.log(salario))
  .catch((err) => console.log(err));
 */

//PROMISE HELL
/* getEmpleado(id)
  .then((empleado) => {
    getSalario(id)
      .then((salario) => {
        console.log(`El empleado ${empleado} tiene un salario de ${salario}`);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err)); */

//then, si todo sale bien

let nombre;
getEmpleado(id)
  .then((empleado) => {
    nombre = empleado;
    return getSalario(id);
  })
  .then((salario) =>
    console.log(`El empleado ${nombre} tiene un salario de ${salario}`)
  )
  .catch((err) => console.log(err));
