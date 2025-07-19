import "./style.css";

type Cartas = {
    nombre: string;
    imagen: string;
}

let cartas: Cartas[] = [
    { nombre: "leon", imagen:"/img/1.png" },
    { nombre: "buho", imagen:"/img/2.png" },
    { nombre: "perro", imagen:"/img/3.png" }, 
    { nombre: "pollo", imagen:"/img/4.png" },
    { nombre: "cerdo", imagen:"/img/5.png" },
    { nombre: "abeja", imagen:"/img/6.png" }
];

const zona = document.querySelector(".zona-cartas");



/*  Función genérica para duplicar un array
    <T> es un tipo genérico que se puede reemplazar por cualquier tipo
const duplicarArray = <T>(array: T[]): T[] => [...array, ...array]; */

// Función específica para duplicar el array de cartas
const duplicarArray = (cartas: Cartas[]): Cartas[] => [...cartas, ...cartas];

const cartasDoble: Cartas[] = duplicarArray(cartas);

const durstenfeldShuffle = <T>(array: T[]): T[] => {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};


const cartasBarajadas = durstenfeldShuffle(cartasDoble);
console.log(cartasBarajadas);

cartasBarajadas.forEach(carta => {
    const div = document.createElement("div");
    div.innerHTML = `
        <img src="${carta.imagen}" width="150">
        `;
        zona?.appendChild(div);
        // Es lo mismo que poner if (zona !== null) &&  zona !== undefined) zona.appendChild(div)
});