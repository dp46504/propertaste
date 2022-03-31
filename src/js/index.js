/* eslint-disable linebreak-style */

import menu from "./menu.js";

//Zeby na telefonie pasek adresu nie zmuszal aplikacji do bycia scrollable
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

//Jesli ktos wejdzie na komputerze to strona powie mu
//zeby wszedl na telefonie   \/
if (window.innerWidth < 800) {
  //Znikanie ekranu witającego
  window.addEventListener("load", () => {
    const logo = document.getElementById("logoSvg");
    const name = document.getElementById("name");

    logo.classList.add("animacjaZnikanie");
    name.classList.add("animacjaZnikanie");
    setTimeout(() => {
      //Usuwanie logo i nazwy
      document.querySelector("article").removeChild(name);
      document.querySelector("article").removeChild(logo);

      //Dodawanie menu herbat
      menu();
    }, 1500);
    console.log("phone");
  });
} else {
  console.log("not phone");
  const articleElement = document.querySelector("article");
  const sorryBox = document.createElement("div");
  sorryBox.innerHTML =
    "<p>Who is walking with his computer around kitchen nowadays? Switch to mobile!</p>";
  sorryBox.classList.add("sorryBox");
  articleElement.insertAdjacentElement("beforeend", sorryBox);
}
