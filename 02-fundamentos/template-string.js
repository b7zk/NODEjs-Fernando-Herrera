const nombre = "Deadpool";
const real = "Wade Winston";

const normal = nombre + " " + real;
//template string ejectuta todo el contenido interno
const template = `${nombre} ${real}`;
console.log(normal);
console.log(template);

console.log(normal === template);

//permiten desarrollo multilinea

const html = `
<h1>hola</h1>
<p>Hola Mundo</p>
`;

console.log(html);
