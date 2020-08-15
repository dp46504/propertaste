/* eslint-disable linebreak-style */
import menu from './menu.js';

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

            //Dodanie pliku dzwiekowego na koniec odliczania
            const ready_sound = new Audio('../../design/ready_sound.wav')

            //Funkcja zapetlajaca dzwiek
            const sound_repeat = ()=>{
                ready_sound.currentTime=0
                ready_sound.play()
            }

            //Zapetlanie dzwieku
            ready_sound.addEventListener('ended', sound_repeat)

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
                            //Koniec odliczania
                        clearInterval(interwal)
                        children[0].innerHTML = "ready"
                        children[0].classList.add('animacjaKulkaFinished')
                        ready_sound.play()
                    }

                },1000)

                
            }



            //Edytowanie temperatura
            temperatura.innerHTML=temperaturaInfo

            //Edytowanie ciekawostek
            const xhr = new XMLHttpRequest()
            const url = `https://propertasteapp.azurewebsites.net/tips/${herbata}`

            xhr.open('get', url)

            xhr.onreadystatechange = ()=>{
                if(xhr.readyState==4 && xhr.status==200){
                    console.log('dziala')
                }
            }
            xhr.send()

            ciekawostki.innerHTML=url

            //Edytowanie powrotu
            strzalka.src='../../design/arrow_left.svg'

            //Obsluzenie dzialania strzalki (Powrot do Menu)
            powrot.addEventListener('click', function backToMenu(){

                //Dodanie elementu kulki o kolorze tla oraz dodanie jej animacji
                const kulkaPowrot = document.createElement('div')
                kulkaPowrot.classList.add('kulka')
                kulkaPowrot.classList.add('kulkaPowrot')
                kulkaPowrot.classList.add('animacjaKulkaPowrot')

                //Załączanie kulki do article
                articleObject.appendChild(kulkaPowrot)

                //Usuwanie wszystkiego z Art
                setTimeout(()=>{
                    articleObject.removeChild(powrot)
                    articleObject.removeChild(menuObject)
                    articleObject.removeChild(temperatura)

                    menu()
                    setTimeout(()=>{
                        articleObject.removeChild(kulkaPowrot)
                    },400)
                },400)

                //Usuwanie listenera pliku dzwiekowego 
                ready_sound.removeEventListener('ended', sound_repeat)

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

                //Dodanie efektu klikniecia przycisku na kulke przy starcie timera oraz usuniecie tej animacji po jej wykonaniu
                children[0].classList.add('animacjaKulkaStart')
                setTimeout(()=>{
                children[0].classList.remove('animacjaKulkaStart')
                },600)

                children[0].removeEventListener('click', handler)
            })

            //Dodanie napisu start
            setTimeout(()=>{
                
                //Nadanie stanu z ostatniej klatki animacji kulkafullscreen przed jej usunieciem
                children[0].style.transform='scale(1.75)'

                //Usuniecie animacji kulkaFullScreen
                children[0].classList.remove('animacjaKulkaFullScreen')


                //Dodanie animacji pojawiania sie tekstu start
                children[0].classList.add('animacjaPojawienieTekstu')

                //Usuniecie animacji pojawiania sie tekstu
                setTimeout(()=>{
                    children[0].classList.remove('animacjaPojawienieTekstu')
                },800)

                children[0].innerHTML = 'start'
            },400)

            

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
            wyswietlanieWartosci(2000, '90°C-100°C')    
            break;
            case 'czerwona':
            wyswietlanieWartosci(90000, '90°C-100°C')    
            break;
            case 'biala':
            wyswietlanieWartosci(330000, '80°C-85°C')    
            break;
        }



    }