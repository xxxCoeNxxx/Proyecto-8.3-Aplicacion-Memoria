import "./style.css";

const carta1 = document.getElementById("1") as HTMLDivElement;
const carta2 = document.getElementById("2") as HTMLDivElement;

function ocultarCarta(carta: HTMLElement) {
    carta.classList.remove("flip-vertical-left");
    carta.classList.add("flip-vertical-right", "carta-vacia");
    carta.style.backgroundImage = "none";
}

if (carta1) {
    carta1.addEventListener("click", () => {
        carta1.classList.remove("carta-vacia", "flip-vertical-right");
        carta1.classList.add("flip-vertical-left");
        carta1.style.backgroundImage = "url('/img/1.png')";

        carta2.addEventListener("click", () => {
            carta2.classList.remove("carta-vacia", "flip-vertical-right");
            carta2.classList.add("flip-vertical-left");
            carta2.style.backgroundImage = "url('/img/2.png')";
            setTimeout(() => {
            ocultarCarta(carta1);
            ocultarCarta(carta2);
            }, 1500);
        });
    });
}
