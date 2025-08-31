import { tablero } from "../modelo/model.ts";
import { iniciaPartida, ocultarCarta, sonPareja, voltearCarta, esPartidaCompleta } from "../motor/motor.ts";

let indicePrimeraCarta: number | null = null;
let indiceSegundaCarta: number | null = null;
let bloqueoClick = false;

// Botón de inicio
export const crearBotonIniciar = () => {
  const boton = document.getElementById("boton_iniciar") as HTMLButtonElement;

  if (boton) {
    boton.addEventListener("click", () => {
      iniciaPartida(tablero); 
      console.log(tablero.estadoPartida);
      indicePrimeraCarta = null;
      indiceSegundaCarta = null;
      bloqueoClick = false;

      for (let nCarta = 1; nCarta <= 12; nCarta++) {
        const cartaDOM = document.getElementById(nCarta.toString()) as HTMLDivElement;
        ocultarCarta(cartaDOM); 
      }
    });
  }
};

console.log(tablero.estadoPartida);

if (tablero.estadoPartida === "PartidaNoIniciada") { bloqueoClick = true; }

for (let nCarta = 1; nCarta <= 12; nCarta++) {
  const cartaDOM = document.getElementById(nCarta.toString()) as HTMLDivElement;

  cartaDOM.addEventListener("click", () => {
  if (bloqueoClick) return;
  const indice = nCarta -1;
  const carta = tablero.cartas[indice];
  
  if (carta.encontrada || carta.estaVuelta) return;

  voltearCarta(cartaDOM, carta.imagen);
  carta.estaVuelta = true;

  if (tablero.estadoPartida === "UnaCartaLevantada") {tablero.estadoPartida = "DosCartasLevantadas"}
  if (tablero.estadoPartida === "CeroCartasLevantadas") {tablero.estadoPartida = "UnaCartaLevantada"}
  console.log(tablero.estadoPartida);

  if (indicePrimeraCarta === null) {
    indicePrimeraCarta = indice;
  } else if (indiceSegundaCarta === null) {
    indiceSegundaCarta = indice;
    
    const carta1DOM = document.getElementById((indicePrimeraCarta + 1).toString()) as HTMLDivElement;
    const carta2DOM = document.getElementById((indiceSegundaCarta + 1).toString()) as HTMLDivElement;

    if (sonPareja(indicePrimeraCarta, indiceSegundaCarta, tablero)) {
      indicePrimeraCarta = null;
      indiceSegundaCarta = null;

      if (esPartidaCompleta(tablero)) {
        tablero.estadoPartida = "PartidaCompleta";
        console.log(tablero.estadoPartida);
      }
    } else {
      bloqueoClick = true;
      setTimeout(() => {
        ocultarCarta(carta1DOM);
        ocultarCarta(carta2DOM);
        tablero.cartas[indicePrimeraCarta!].estaVuelta = false;
        tablero.cartas[indiceSegundaCarta!].estaVuelta = false;
        indicePrimeraCarta = null;
        indiceSegundaCarta = null;
        bloqueoClick = false;
      }, 1000);
      }
   }
  });
}