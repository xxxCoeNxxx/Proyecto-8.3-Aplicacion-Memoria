import { Carta, Tablero, cartas, crearCartaInicial } from "../modelo/model";

// Barajamos las cartas
export const barajarCartas = (cartas : Carta[]): Carta[] => {
  const durstenfeldShuffle = <T>(array: T[]): T[] => {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  };
  return durstenfeldShuffle(cartas);
};

// Comprueba si una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
  if (tablero.cartas[indice].encontrada || tablero.cartas[indice].estaVuelta || tablero.estadoPartida === "DosCartasLevantadas") {
    return false;
  }
  return true;
};

export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    tablero.cartas[indice].estaVuelta = true;

    if (tablero.indiceCartaVolteadaA === undefined) {
      tablero.indiceCartaVolteadaA = indice;
      tablero.estadoPartida = "UnaCartaLevantada";
    } else {
      tablero.indiceCartaVolteadaB = indice;
      tablero.estadoPartida = "DosCartasLevantadas";

      if (tablero.indiceCartaVolteadaA !== -1 && tablero.indiceCartaVolteadaB !== -1) {
        // Ya tenemos dos cartas volteadas → comprobar pareja
        sonPareja(tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB, tablero);

        // Reset para la siguiente jugada
        tablero.indiceCartaVolteadaA = -1;
        tablero.indiceCartaVolteadaB = -1;
      }
    }
  }
};

// Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  if (tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto) {
    //tablero.estadoPartida = "DosCartasLevantadas";
    parejaEncontrada(tablero, indiceA, indiceB);
    return true;
  }
  //tablero.estadoPartida = "DosCartasLevantadas";
  parejaNoEncontrada(tablero, indiceA, indiceB);
  return false;
};

// Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  
  if (esPartidaCompleta(tablero)) {
    tablero.estadoPartida = "PartidaCompleta";
  }
};

// Aquí asumimos que no son pareja y las volvemos a poner boca abajo
const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  tablero.estadoPartida = "CeroCartasLevantadas";
};

// Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
export const esPartidaCompleta = (tablero: Tablero) : boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

// Iniciar partida
export const iniciaPartida = (tablero: Tablero): void => {
  // Creamos nuevas cartas y las añadimos al tablero
  const cartasReiniciadas: Carta[] = [];
  cartas.forEach(carta => {
    const nuevaCarta = crearCartaInicial(carta.idFoto, carta.imagen);
    cartasReiniciadas.push(nuevaCarta);
  });

  // Barajamos
  tablero.cartas = barajarCartas(cartasReiniciadas);

  // Reseteamos el estado
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });
};

export const ocultarCarta = (carta: HTMLElement) => {
    carta.classList.remove("flip-vertical-left");
    carta.classList.add("flip-vertical-right", "carta-vacia");
    setTimeout(() => {
        carta.style.backgroundImage = "none";
    }, 200);
};

export const voltearCarta = (carta: HTMLElement, url: string): void => {
  carta.classList.remove("carta-vacia", "flip-vertical-right");
  carta.classList.add("flip-vertical-left");
  carta.style.backgroundImage = `url('${url}')`;
};