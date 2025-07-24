import "./style.css";

const carta = document.getElementById("carta") as HTMLImageElement;

if (carta) {
  carta.addEventListener("click", () => {
    carta.classList.remove("flip-vertical-right", "carta");
    carta.classList.add("flip-vertical-left");
    carta.src = "/img/1.png"

    setTimeout(() => {
      carta.classList.remove("flip-vertical-left");
      carta.classList.add("flip-vertical-right", "carta-vacia");
    }, 1500);
  });
}
