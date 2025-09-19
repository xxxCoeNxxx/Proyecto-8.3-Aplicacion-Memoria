import { Carta, Tablero, cartas, crearCartaInicial } from "../modelo/model";
import { noEncontradaPareja, encontradaPareja } from "../ui/ui";

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
export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
  if (tablero.cartas[indice].encontrada || tablero.cartas[indice].estaVuelta || tablero.estadoPartida === "DosCartasLevantadas") {
    return false;
  }
  return true;
};

export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
  tablero.cartas[indice].estaVuelta = true;
  if (tablero.estadoPartida === 'CeroCartasLevantadas') {
    tablero.indiceCartaVolteadaA = indice;
    tablero.estadoPartida = "UnaCartaLevantada";
  } else if (tablero.estadoPartida === 'UnaCartaLevantada') {
    tablero.indiceCartaVolteadaB = indice;
    tablero.estadoPartida = "DosCartasLevantadas";
  }
};

// Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto
};

// Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.estadoPartida = 'CeroCartasLevantadas';

  if (esPartidaCompleta(tablero)) {
    tablero.estadoPartida = "PartidaCompleta";
  }
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

export const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  tablero.estadoPartida = "CeroCartasLevantadas";
};

export const resetIndices = (tablero: Tablero) => {
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.estadoPartida = "CeroCartasLevantadas";
};


/* export const verSiEsLaSegundaCarta = (tablero: Tablero) => {
  const indiceCartaA = tablero.indiceCartaVolteadaA;
  const indiceCartaB = tablero.indiceCartaVolteadaB;

  if (indiceCartaA !== undefined && indiceCartaB !== undefined) {
    const carta1DOM = document.getElementById((indiceCartaA + 1).toString()) as HTMLDivElement;
    const carta2DOM = document.getElementById((indiceCartaB + 1).toString()) as HTMLDivElement;

    if (sonPareja(indiceCartaA, indiceCartaB, tablero)) {
      encontradaPareja(tablero, indiceCartaA, indiceCartaB, carta1DOM, carta2DOM);
    } else {
      noEncontradaPareja(tablero, indiceCartaA, indiceCartaB, carta1DOM, carta2DOM);
    }
  }
}
 */
