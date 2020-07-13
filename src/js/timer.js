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
            
            
            //Konwersja timera z ms do s
            let czasWs = czasWMs / 1000
            let sekundy;
            let minuty;

            //Odliczanie timera w kółku
            const odliczanie = ()=>{
                let interwal = setInterval(()=>{
                    
                    //konwersja timera z ms do s
                    sekundy = czasWs % 60
                    minuty = Math.floor(czasWs / 60)
                    //edytowanie timera
                    if(sekundy==0){
                        children[0].innerHTML = minuty + ':00'
                    }else if(sekundy<10){
                        children[0].innerHTML = minuty + ':0' + sekundy
                    }else{
                        children[0].innerHTML = minuty + ':' + sekundy
                    }
                    czasWs -= 1;

                    if(czasWs==-1){
                        clearInterval(interwal)
                        children[0].innerHTML = "ready"
                    }

                },1000)

                
            }



            //Edytowanie temperatura
            temperatura.innerHTML=temperaturaInfo

            //Edytowanie ciekawostek
            ciekawostki.innerHTML='this is ciekawoskta in english'

            //Edytowanie powrotu
            strzalka.src='../../design/arrow_left.svg'

            //Obsluzenie dzialania strzalki (Powrot do Menu)
            powrot.addEventListener('click', function backToMenu(){

                //Znikanie elementow
                powrot.classList.add('animacjaZnikanieNoDelay');
                ciekawostki.classList.add('animacjaZnikanieNoDelay');
                temperatura.classList.add('animacjaZnikanieNoDelay');

                //Animacja znikania tekstu timera
                for(let i = children[0].innerHTML.length-1; i>=0; i--){
                    setTimeout(()=>{
                        
                    },50)
                }

                
                powrot.removeEventListener('click', backToMenu)
            })



            //Dodanie id
            strzalka.id='strzalka'
            temperatura.id='temperaturaBox'
            ciekawostki.id='ciekawostkiBox'
            powrot.id='powrotStrzalka'


            //Obsłużenie startu timera
            children[0].addEventListener('click', function handler(){
                odliczanie()
                children[0].removeEventListener('click', handler)
            })

            //Dodanie napisu start
            setTimeout(()=>{
                children[0].innerHTML = 'start'
            },800)

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
            wyswietlanieWartosci(5000, '90°C-100°C')    
            break;
            case 'czerwona':
            wyswietlanieWartosci(90000, '90°C-100°C')    
            break;
            case 'biala':
            wyswietlanieWartosci(330000, '80°C-85°C')    
            break;
        }



    }