/* eslint-disable linebreak-style */


export default (herbata)=>{
    const menuObject = document.querySelector('#menu')
    const articleObject = document.querySelector('article')
    let children = menuObject.children
    const herbaty = ['zielona', 'czarna', 'czerwona', 'biala']
    const position = herbaty.indexOf(herbata)

    //Usuwanie pozostałych kulek
    for(let i=children.length-1 ; i>=0 ; i--){
        if(i==position){
        }else{
            menuObject.removeChild(children[i])
        }}

        //Lista dzieci z jednym pożądanym elementem
        children = menuObject.children
        
        const wyswietlanieWartosci = (czasWMs, temperaturaInfo)=>{
            //Stworzenie elementow
            const temperatura = document.createElement('div')
            const ciekawostki = document.createElement('div')
            const powrot = document.createElement('div')
            const strzalka = document.createElement('img')

            //edytowanie timera
            children[0].innerHTML=czasWMs

            //Edytowanie temperatura
            temperatura.innerHTML=temperaturaInfo

            //Edytowanie ciekawostek
            ciekawostki.innerHTML='ciekawostka fajna odnosnie herbaty tej'

            //Edytowanie powrotu
            strzalka.src='../../design/arrow_left.svg'

            //Obsluzenie dzialania strzalki (Powrot do Menu)
            powrot.addEventListener('click', function backToMenu(){
                console.log('Powrot do menu');
                
                powrot.removeEventListener('click', backToMenu)
            })



            //Dodanie id
            strzalka.id='strzalka'
            temperatura.id='temperaturaBox'
            ciekawostki.id='ciekawostkiBox'
            powrot.id='powrotStrzalka'

            //dodanie elementow do article
            powrot.insertAdjacentElement('afterbegin', strzalka)
            articleObject.insertAdjacentElement('afterbegin', powrot)
            menuObject.insertAdjacentElement('beforeend', ciekawostki)
            articleObject.insertAdjacentElement('beforeend', temperatura)
        }


        switch(herbata){
            case 'zielona':
            wyswietlanieWartosci(180000,'80°C-85°C')  
            break;
            case 'czarna':
            wyswietlanieWartosci(90000, '90°C-100°C')    
            break;
            case 'czerwona':
            wyswietlanieWartosci(90000, '90°C-100°C')    
            break;
            case 'biala':
            wyswietlanieWartosci(330000, '80°C-85°C')    
            break;
        }



    }