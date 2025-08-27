import "./style.css";
import { crearTableroInicial, tablero } from "./src/modelo/model";
import { crearBotonIniciar } from "./src/ui/ui.ts";
import { iniciaPartida } from "./src/motor/motor.ts";

crearBotonIniciar();

console.log(tablero);
console.log(tablero.cartas);













/* 
// Seleccionamos los elementos del DOM
const carta1 = document.getElementById("1") as HTMLDivElement;
const carta2 = document.getElementById("2") as HTMLDivElement;
const carta3 = document.getElementById("3") as HTMLDivElement;
const carta4 = document.getElementById("4") as HTMLDivElement;
const carta5 = document.getElementById("5") as HTMLDivElement;
const carta6 = document.getElementById("6") as HTMLDivElement;
const carta7 = document.getElementById("7") as HTMLDivElement;
const carta8 = document.getElementById("8") as HTMLDivElement;
const carta9 = document.getElementById("9") as HTMLDivElement;
const carta10 = document.getElementById("10") as HTMLDivElement;
const carta11 = document.getElementById("11") as HTMLDivElement;
const carta12 = document.getElementById("12") as HTMLDivElement;

// Funciones para ocultar y voltear cartas mediante los estilos CSS
const ocultarCarta = (carta: HTMLElement) => {
    carta.classList.remove("flip-vertical-left");
    carta.classList.add("flip-vertical-right", "carta-vacia");
    setTimeout(() => {
        carta.style.backgroundImage = "none";
    }, 200);
};
const voltearCarta = (carta: HTMLElement, url: string) => {
  carta.classList.remove("carta-vacia", "flip-vertical-right");
  carta.classList.add("flip-vertical-left");
  carta.style.backgroundImage = `url('${url}')`;
};

// Mapeamos las cartas y les asignamos eventos de clic
const cartas = document.querySelectorAll(".carta");
cartas.forEach((carta) => {
    carta.addEventListener("click", () => {
        switch (carta.id) {
            case "1":
                voltearCarta(carta1, "/img/1.png");
                setTimeout(() => {
                    ocultarCarta(carta1);
                }, 1000);
                break;
            case "2":
                voltearCarta(carta2, "/img/2.png");
                setTimeout(() => {
                    ocultarCarta(carta2);
                }, 1000);
                break;
            case "3":
                voltearCarta(carta3, "/img/3.png");
                setTimeout(() => {
                    ocultarCarta(carta3);
                }, 1000);
                break;
            case "4":
                voltearCarta(carta4, "/img/4.png");
                setTimeout(() => {
                    ocultarCarta(carta4);
                }, 1000);
                break;
            case "5":
                voltearCarta(carta5, "/img/5.png");
                setTimeout(() => {
                    ocultarCarta(carta5);
                }, 1000);
                break;
            case "6":
                voltearCarta(carta6, "/img/6.png");
                setTimeout(() => {
                    ocultarCarta(carta6);
                }, 1000);
                break;
            case "7":
                voltearCarta(carta7, "/img/1.png");
                setTimeout(() => {
                    ocultarCarta(carta7);
                }, 1000);
                break;
            case "8":
                voltearCarta(carta8, "/img/2.png");
                setTimeout(() => {
                    ocultarCarta(carta8);
                }, 1000);
                break;
            case "9":
                voltearCarta(carta9, "/img/3.png");
                setTimeout(() => {
                    ocultarCarta(carta9);
                }, 1000);
                break;
            case "10":
                voltearCarta(carta10, "/img/4.png");
                setTimeout(() => {
                    ocultarCarta(carta10);
                }, 1000);
                break;
            case "11":
                voltearCarta(carta11, "/img/5.png");
                setTimeout(() => {
                    ocultarCarta(carta11);
                }, 1000);
                break;
            case "12":
                voltearCarta(carta12, "/img/6.png");
                setTimeout(() => {
                    ocultarCarta(carta12);
                }, 1000);
                break;
            default:
                break;
        }
    });
}); */