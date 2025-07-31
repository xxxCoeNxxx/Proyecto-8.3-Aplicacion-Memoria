import "./style.css";

const carta = document.getElementById("carta") as HTMLDivElement;

if (carta) {
  carta.addEventListener("click", () => {
    carta.classList.remove("carta-vacia", "flip-vertical-right");
    carta.classList.add("flip-vertical-left");
    carta.style.backgroundImage = "url('/img/1.png')";

    setTimeout(() => {
      carta.classList.remove("flip-vertical-left");
      carta.classList.add("flip-vertical-right", "carta-vacia");
      carta.style.backgroundImage = "none";
    }, 1500);
  });
}
