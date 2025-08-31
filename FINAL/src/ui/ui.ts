import { tablero } from "../modelo/model.ts";
import { iniciaPartida, ocultarCarta, sonPareja, voltearCarta, esPartidaCompleta, 
         mostrarMensajeSobreCarta} from "../motor/motor.ts";

let indicePrimeraCarta: number | null = null;
let indiceSegundaCarta: number | null = null;
let bloqueoClick = false;
let intentos: number = 0;

const intentosDiv = document.getElementById("intentos") as HTMLDivElement;

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
      intentos = 0;
      intentosDiv.innerText = `Intentos: ${intentos}`;

      for (let nCarta = 1; nCarta <= 12; nCarta++) {
        const cartaDOM = document.getElementById(nCarta.toString()) as HTMLDivElement;
        cartaDOM.classList.remove("flip-vertical-left", "flip-vertical-right", "carta-vacia");
        cartaDOM.classList.add("flip-vertical-left", "wobble-hor-bottom");
        setTimeout(() => {
          cartaDOM.classList.remove("flip-vertical-left");
          cartaDOM.classList.add("flip-vertical-right", "carta-vacia");
          cartaDOM.style.backgroundImage = "none";
        }, 300);
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
    
    if (carta.encontrada || carta.estaVuelta) {
      mostrarMensajeSobreCarta(cartaDOM, "Ya está volteda");
      return;
    }

    voltearCarta(cartaDOM, carta.imagen);
    carta.estaVuelta = true;
    cartaDOM.classList.remove("wobble-hor-bottom");
    
    if (tablero.estadoPartida === "UnaCartaLevantada") {
      tablero.estadoPartida = "DosCartasLevantadas"
      intentos++;
      intentosDiv.innerText = `Intentos: ${intentos}`;
    }
    if (tablero.estadoPartida === "CeroCartasLevantadas") {
      tablero.estadoPartida = "UnaCartaLevantada"
    }
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
        carta1DOM.classList.remove("wobble-hor-bottom");
        carta2DOM.classList.remove("wobble-hor-bottom");

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
          carta1DOM.classList.add("wobble-hor-bottom");
          carta2DOM.classList.add("wobble-hor-bottom");
          indicePrimeraCarta = null;
          indiceSegundaCarta = null;
          bloqueoClick = false;
        }, 1000);
        }
    }
  });
}