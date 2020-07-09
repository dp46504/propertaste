/* eslint-disable linebreak-style */


export default (herbata)=>{
    const menuObject = document.querySelector('#menu')
    let children = menuObject.children
    const herbaty = ['zielona', 'czarna', 'czerwona', 'biala']
    const position = herbaty.indexOf(herbata)

    const wartosci = new Map([[180000,'80°C-85°C'], [90000, '90°C-100°C'], [90000, '90°C-100°C'], [330000, '80°C-85°C']])

    //Usuwanie pozostałych kulek
    for(let i=children.length-1 ; i>=0 ; i--){
        if(i==position){
        }else{
            menuObject.removeChild(children[i])
        }}

        //Lista dzieci z jednym pożądanym elementem
        children = menuObject.children
        
        



    }