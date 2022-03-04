const nombre = "Osmar";
//var ya no se utiliza
//el let redefine la variable nombre definida en distinto scope
//const son más ligeras y no pueden redefinirse, pero puede crearse la misma variable dentro del scope

if (true) {
  const nombre = "Magneto";
}
console.log(nombre);
