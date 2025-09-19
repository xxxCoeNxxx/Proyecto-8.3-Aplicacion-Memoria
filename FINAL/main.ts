import "./style.css";
import { crearBotonIniciar, mapearDivsCartas } from "./src/ui/ui.ts";


document.addEventListener("DOMContentLoaded", () => {
    crearBotonIniciar();
    mapearDivsCartas();
})