export interface Carta {
  idFoto: number;
  imagen: string;
  estaVuelta: boolean;
  encontrada: boolean;
};

interface InfoCarta {
  idFoto: number;
  imagen: string;
};

const infoCartas: InfoCarta[] = [  
  { idFoto: 1, imagen: "/img/1.png"},
  { idFoto: 2, imagen: "/img/2.png"},
  { idFoto: 3, imagen: "/img/3.png"},
  { idFoto: 4, imagen: "/img/4.png"},
  { idFoto: 5, imagen: "/img/5.png"},
  { idFoto: 6, imagen: "/img/6.png"},
];

export const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  infoCartas.forEach((info) => {
    const carta: Carta = crearCartaInicial(info.idFoto, info.imagen);

    cartas.push({ ...carta }, { ...carta });
  });

  return cartas;
};

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
};

const crearTableroInicial = (): Tablero => ({
  cartas: cartas,
  estadoPartida: "PartidaNoIniciada",
});

export let tablero: Tablero = crearTableroInicial();