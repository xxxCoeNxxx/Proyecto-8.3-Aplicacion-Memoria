import { tablero } from "../modelo/model.ts";
import { barajarCartas, iniciaPartida } from "../motor/motor.ts";

// Botón de inicio
export const crearBotonIniciar = () => {
  const boton = document.getElementById("boton_iniciar") as HTMLButtonElement;
 
  if (boton) {
    boton.addEventListener("click", () => {
        barajarCartas(tablero.cartas);
        iniciaPartida(tablero);
        console.log(tablero);
    });
  }
};
