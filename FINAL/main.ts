import "./style.css";
import { Tablero } from "./src/modelo/model.ts";
import { crearBotonIniciar } from "./src/ui/ui.ts";

const tablero: Tablero = {
    indiceCartaVolteadaA: -1,
    indiceCartaVolteadaB: -1,
    cartas: [],
    estadoPartida: "PartidaNoIniciada",
};

crearBotonIniciar();
