/* eslint-disable linebreak-style */

import pokazTimer from './timer.js';
//Funkcja tworząca menu herbat
export default ()=>{

   
    
    //inicjacja elementow
    const menu = document.createElement("div");
    const zielona = document.createElement("div");
    const czarna = document.createElement("div");
    const czerwona = document.createElement("div");
    const biala = document.createElement("div");

    const herbaty = new Map([[zielona, 'zielona'],[czarna, 'czarna'],[czerwona, 'czerwona'],[biala, 'biala']]);

    //nadawanie ksztaltu kulki
    herbaty.forEach((value, key)=>{
         key.classList.add('kulka');
    });

    //dodawanie poszczegolnych klas kulek
    herbaty.forEach((value, key)=>{
        key.classList.add(value);
    });


    //dodanie animacji FullScreen do kazdej kulki na kliknieciu
    herbaty.forEach((value, key)=>{
        key.addEventListener('click', function nasluchiwacz(){
            key.classList.add('animacjaKulkaFullScreen');

            //Wyswietlanie ekranu timera
            //Tieout, zeby inne elementy zniknely dopiero kiedy kulka je zakryje
            setTimeout(()=>{pokazTimer(value);}, 400)
            

            //Usuwanie eventlistenera
            key.removeEventListener('click', nasluchiwacz)


        })
    });


    menu.classList.add('animacjaPojawianie');
    menu.id="menu";

    //Dodawanie menu do article
    document.querySelector('article').insertAdjacentElement('beforeend', menu);

    //Dodawanie kulek do menu
    herbaty.forEach((value, key)=>{
        document.querySelector('#menu').insertAdjacentElement('beforeend', key)
    })
}
