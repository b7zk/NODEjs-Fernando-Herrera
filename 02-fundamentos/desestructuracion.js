const deadpool = {
  nombre: "Wade",
  apellido: "Winston",
  poder: "Regeneración",
  /* edad: 50, */
  getNombre() {
    return `${this.nombre} ${this.apellido}`;
  },
};

console.log(deadpool.getNombre());

/* const nombre = deadpool.nombre;
const apellido = deadpool.apellido;
const poder = deadpool.poder;
 */

//desestructuracion:
/* const { nombre, apellido, poder, edad = 0 } = deadpool; */

//desestructuracion directa:
/* function imprimeHeroe({ nombre, apellido, poder, edad = 0 }) {
  console.log(nombre, apellido, poder, edad);
  imprimeHeroe(deadpool);
} */

//destructuración de arreglos:
const heroes = ["Deadpool", "Superman", "Batman"];
/* const [h1, h2, h3] = heroes; */

//para omitir y solo obtener un argumento:
const [, , h3] = heroes;
console.log(h3);
