import { tablero, Tablero } from "../modelo/model.ts";
import { iniciaPartida, esPartidaCompleta, parejaEncontrada, sePuedeVoltearLaCarta, 
  voltearLaCarta, parejaNoEncontrada,resetIndices, sonPareja } from "../motor/motor.ts";

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
      resetIndices(tablero); 
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
    const cartaDOM = document.getElementById(nCarta.toString());
    if (cartaDOM && cartaDOM instanceof HTMLDivElement) {
      cartaDOM.addEventListener('click', () => manejarClickCarta(tablero, nCarta -1, cartaDOM));
    }
  }
};

const manejarClickCarta = (tablero: Tablero, indice: number, cartaDOM: HTMLDivElement) => {
  if (bloqueoClick) return;
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    voltearLaCarta(tablero, indice);
    voltearCarta(cartaDOM, tablero.cartas[indice].imagen);
    modificarWobble("remove", cartaDOM);
    esLaSegundaCarta(tablero);
  } else {
    mostrarMensajeSegunEstado(tablero, indice, cartaDOM);
  }
};

const mostrarMensajeSegunEstado = (tablero: Tablero, indice: number, cartaDOM: HTMLDivElement) => {
  const carta = tablero.cartas[indice];
  if (carta.encontrada) {
    mostrarMensajeSobreCarta(cartaDOM, "Ya encontraste esta pareja");
  } else if (carta.estaVuelta) {
    mostrarMensajeSobreCarta(cartaDOM, "Ya está volteada");
  } else {
    mostrarMensajeSobreCarta(cartaDOM, "No se puede voltear ahora");
  }
};

const esLaSegundaCarta = (tablero: Tablero) => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;

  if (indiceA !== undefined && indiceB !== undefined) {
    const carta1DOM = document.getElementById((indiceA + 1).toString());
    const carta2DOM = document.getElementById((indiceB + 1).toString());

    if (carta1DOM instanceof HTMLDivElement && carta2DOM instanceof HTMLDivElement) {
      if (sonPareja(indiceA, indiceB, tablero)) {
        encontradaPareja(tablero, indiceA, indiceB, carta1DOM, carta2DOM); 
      } else {
        noEncontradaPareja(tablero, indiceA, indiceB, carta1DOM, carta2DOM);
      }
      resetIndices(tablero);
    }
  }
};

export const encontradaPareja = (tablero: Tablero, indicePrimeraCarta: number, indiceSegundaCarta: number, 
  carta1DOM: HTMLDivElement, carta2DOM: HTMLDivElement) => {
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

export const noEncontradaPareja = (tablero: Tablero, indiceA: number, indiceB: number, 
  carta1DOM: HTMLDivElement, carta2DOM: HTMLDivElement) => {
  bloqueoClick = true;
  setTimeout(() => {
    ocultarCarta(carta1DOM);
    ocultarCarta(carta2DOM);
    tablero.cartas[indiceA].estaVuelta = false;
    tablero.cartas[indiceB].estaVuelta = false;
    modificarWobble("add", carta1DOM, carta2DOM);
    resetIndices(tablero);
    parejaNoEncontrada(tablero, indiceA, indiceB);
    bloqueoClick = false;
  }, 1000);
};

const voltearCarta = (carta: HTMLElement, url: string): void => {
  carta.classList.remove("carta-vacia", "flip-vertical-right");
  carta.classList.add("flip-vertical-left");
  carta.style.backgroundImage = `url('${url}')`;
};

const ocultarCarta = (carta: HTMLElement) => {
    carta.classList.remove("flip-vertical-left");
    carta.classList.add("flip-vertical-right", "carta-vacia");
    setTimeout(() => {
        carta.style.backgroundImage = "none";
    }, 200);
};

const modificarWobble = (elegir: "add" | "remove", ...cartas: HTMLDivElement[]) => {
  cartas.forEach(carta => {
    if (elegir === "add") {
      carta.classList.add("wobble-hor-bottom");
    } else {
      carta.classList.remove("wobble-hor-bottom");
    }
  });
};

export const mostrarMensajeSobreCarta = (cartaDOM: HTMLDivElement, texto: string) => {
  const rect = cartaDOM.getBoundingClientRect(); 
  const tip = document.createElement("div");
  tip.className = "mensaje-carta";
  tip.textContent = texto;
  
  // Posicionamos el mensaje sobre la carta
  tip.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
  tip.style.top = `${rect.top - 30 + window.scrollY}px`;
  tip.style.transform = "translateX(-50%)";
  
  document.body.appendChild(tip);
  
  // Forzamos que se aplique la transición
  requestAnimationFrame(() => tip.classList.add("mensaje-carta--visible"));
  
  // Lo ocultamos después de 1.2s
  setTimeout(() => {
    tip.classList.remove("mensaje-carta--visible");
    setTimeout(() => tip.remove(), 250);
  }, 1200);
};