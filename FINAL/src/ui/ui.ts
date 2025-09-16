import { tablero, Tablero } from "../modelo/model.ts";
import { iniciaPartida, ocultarCarta, sonPareja, esPartidaCompleta, 
         mostrarMensajeSobreCarta, parejaEncontrada, 
        sePuedeVoltearLaCarta, verSiEsLaSegundaCarta} from "../motor/motor.ts";

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
      resetIndices(); 
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

// Mapear los divs de las cartas
export const mapearDivsCartas = () => {
  for (let nCarta = 1; nCarta <= 12; nCarta++) {
    const cartaDOM = document.getElementById(nCarta.toString()) as HTMLDivElement;

    cartaDOM.addEventListener("click", () => {
      if (bloqueoClick) return;
        const indice = nCarta -1;
        const carta = tablero.cartas[indice];
        
      // 1. Si la carta se le puede voltear => sePuedeVoltearLaCarta
      if (sePuedeVoltearLaCarta(tablero, indice)) {
        // 2. Se comprueba si se puede voltear y si no se puede, mostrar mensaje
        if (carta.encontrada || carta.estaVuelta) {
          mostrarMensajeSobreCarta(cartaDOM, "Ya está volteda");
          return;
        }
        // 3. Si se puede voltear, ejecutar la función de voltearLaCarta
        voltearCarta(cartaDOM, carta.imagen);
        carta.estaVuelta = true;
        cartaDOM.classList.remove("wobble-hor-bottom");
    }

    if (tablero.estadoPartida === "UnaCartaLevantada") {
      tablero.estadoPartida = "DosCartasLevantadas"
      intentos++;
      intentosDiv.innerText = `Intentos: ${intentos}`;
    }
    if (tablero.estadoPartida === "CeroCartasLevantadas") {
      tablero.estadoPartida = "UnaCartaLevantada"
    }
    console.log(tablero.estadoPartida);

    // 5. Ver la función de verSiEsLaSegundaCarta
    verSiEsLaSegundaCarta(tablero);

    if (indicePrimeraCarta === null) {
      indicePrimeraCarta = indice;
    } else if (indiceSegundaCarta === null) {
      indiceSegundaCarta = indice;
      
      const carta1DOM = document.getElementById((indicePrimeraCarta + 1).toString()) as HTMLDivElement;
      const carta2DOM = document.getElementById((indiceSegundaCarta + 1).toString()) as HTMLDivElement;

      if (sonPareja(indicePrimeraCarta, indiceSegundaCarta, tablero)) {
        resetIndices();
        tablero.estadoPartida = 'CeroCartasLevantadas';
        modificarWobble("remove", carta1DOM, carta2DOM);

        if (esPartidaCompleta(tablero)) {
          tablero.estadoPartida = "PartidaCompleta";
          console.log(tablero.estadoPartida);

          const mensajeFinal = document.getElementById("mensaje-final") as HTMLDivElement;
          mensajeFinal.textContent = "¡Has ganado!";
          mensajeFinal.classList.add ("visible");
          setTimeout(() => {
            mensajeFinal.classList.remove("visible");
            mensajeFinal.textContent = "";
          }, 3000);
        }
      } else {
        bloqueoClick = true;
        setTimeout(() => {
          ocultarCarta(carta1DOM);
          ocultarCarta(carta2DOM);
          tablero.cartas[indicePrimeraCarta!].estaVuelta = false;
          tablero.cartas[indiceSegundaCarta!].estaVuelta = false;
          modificarWobble("add", carta1DOM, carta2DOM);
          resetIndices();
          tablero.estadoPartida = 'CeroCartasLevantadas';
          bloqueoClick = false;
        }, 1000);
        }
      }
    });
  }
}

export const encontradaPareja = (tablero: Tablero, indicePrimeraCarta: number, indiceSegundaCarta: number, carta1DOM: HTMLDivElement, carta2DOM: HTMLDivElement) => {
  parejaEncontrada(tablero, indicePrimeraCarta, indiceSegundaCarta);
  modificarWobble("remove", carta1DOM, carta2DOM);

  if (esPartidaCompleta(tablero)) {
    tablero.estadoPartida = "PartidaCompleta";
    console.log(tablero.estadoPartida);

    const mensajeFinal = document.getElementById("mensaje-final") as HTMLDivElement;
    mensajeFinal.textContent = "¡Has ganado!";
    mensajeFinal.classList.add("visible");
    setTimeout(() => {
      mensajeFinal.classList.remove("visible");
      mensajeFinal.textContent = "";
    }, 3000);
  }
}

export const noEncontradaPareja = (carta1DOM: HTMLDivElement, carta2DOM: HTMLDivElement) => {
  bloqueoClick = true;
  setTimeout(() => {
    ocultarCarta(carta1DOM);
    ocultarCarta(carta2DOM);
    tablero.cartas[indicePrimeraCarta!].estaVuelta = false;
    tablero.cartas[indiceSegundaCarta!].estaVuelta = false;
    modificarWobble("add", carta1DOM, carta2DOM);
    resetIndices();
    bloqueoClick = false;
  }, 1000);
}

const voltearCarta = (carta: HTMLElement, url: string): void => {
  carta.classList.remove("carta-vacia", "flip-vertical-right");
  carta.classList.add("flip-vertical-left");
  carta.style.backgroundImage = `url('${url}')`;
};

const resetIndices = () => {
  indicePrimeraCarta = null;
  indiceSegundaCarta = null;
}

const modificarWobble = (elegir: "add" | "remove", ...cartas: HTMLDivElement[]) => {
  cartas.forEach(carta => {
    if (elegir === "add") {
      carta.classList.add("wobble-hor-bottom");
    } else {
      carta.classList.remove("wobble-hor-bottom");
    }
  });
};
