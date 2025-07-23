import "./style.css";

const carta = document.getElementById("carta") as HTMLImageElement;

if (carta) {
  carta.addEventListener("click", () => {
    
    carta.src = "/img/2.png";
  })
}
