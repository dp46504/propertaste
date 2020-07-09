/* eslint-disable linebreak-style */

import menu from './menu.js';


//Jesli ktos wejdzie na komputerze to strona powie mu
//zeby wszedl na telefonie   \/
if(screen.width<800){

//Znikanie ekranu witającego
window.addEventListener('load', ()=>{
    const logo = document.getElementById('logoSvg');
    const name = document.getElementById('name');

    logo.classList.add('animacjaZnikanie');
    name.classList.add('animacjaZnikanie');
    setTimeout(()=>{
        //Usuwanie logo i nazwy
        document.querySelector('article').removeChild(name);
        document.querySelector('article').removeChild(logo);

        //Dodawanie menu herbat
        menu();

    }, 1500);
})
}else{
    const articleElement = document.querySelector('article');
    const sorryBox = document.createElement('div');
    sorryBox.innerHTML="<p>Who is walking with his computer around kitchen nowadays? Switch to mobile</p>";
    sorryBox.classList.add('sorryBox');
    articleElement.insertAdjacentElement('beforeend', sorryBox);
}
