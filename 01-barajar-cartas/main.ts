import "./style.css";

/* Creamos un modelo para InfoCarta
   Creamos la baraja de 6 cartas
   Duplicamos la baraja
   Utilizamos el algoritmo de Durstenfeld para barajar
   Creamos un array vacío para utilizarlo como nueva baraja
   Creamos un botón para barajar las cartas
   Y un evento al hacer click en él
 */


interface InfoCarta {
  idFoto: number;
  imagen: string;
  emoji?: string;
}

const infoCartas: InfoCarta[] = [
  { idFoto: 1, imagen: "/img/1.png", emoji: "🦁"},
  { idFoto: 2, imagen: "/img/2.png", emoji: "🦉"},
  { idFoto: 3, imagen: "/img/3.png", emoji: "🐶"},
  { idFoto: 4, imagen: "/img/4.png", emoji: "🐔"},
  { idFoto: 5, imagen: "/img/5.png", emoji: "🐷"},
  { idFoto: 6, imagen: "/img/6.png", emoji: "🐝"},
];

const barajaDoce = (infoCartas: InfoCarta[]): InfoCarta[] => [...infoCartas, ...infoCartas];

const durstenfeldShuffle = <T>(array: T[]): T[] => {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

let barajaActual: InfoCarta[] = [];

const botonBarajar = document.querySelector("#barajar")

if (botonBarajar) {
  botonBarajar.addEventListener("click", () => {
    barajaActual = durstenfeldShuffle(barajaDoce(infoCartas));
    console.log(barajaActual.map(c => c.emoji).join(" "));
  });
}