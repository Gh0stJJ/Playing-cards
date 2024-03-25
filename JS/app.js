/*
*    JS Para la comprobación de los datos del formulario
*   @autor: Juanja
*   @version: 1.0
*/


//Inicializacion de var, objetos, DOM
var nickInput;
var sizeInput;
var difficultyInput;
var formEntrada;
var error;
var avatarItems;
var itemImg;
var avartarContainer;



//Funciones de eventos
function comprobarForm(e){
    if(nickInput.value.length == 0){
        console.log('El nick no puede estar vacio');
        nickInput.focus();
        e.preventDefault(); //Evita que se envie el formulario
        error.innerText = 'El nick no puede estar vacio';
        return false;
    }else if(sizeInput.value == '0'){
        console.log('No se ha seleccionado un tamaño de tablero');
        sizeInput.focus();
        e.preventDefault(); //Evita que se envie el formulario
        error.innerText = 'No se ha seleccionado un tamaño de tablero';
        return false;
    }else if(difficultyInput.value == '0'){
        console.log('No se ha seleccionado una dificultad');
        difficultyInput.focus();
        e.preventDefault(); //Evita que se envie el formulario
        error.innerText = 'No se ha seleccionado una dificultad!!';
        return false;
    }else if(nickInput.value.match(/(?<!\S)[0-9]/)){
        console.log('El nick no puede comenzar con numeros');
        nickInput.focus();
        e.preventDefault(); //Evita que se envie el formulario
        error.innerText = 'El nick no puede comenzar con numeros';
        return false;
    }

    //Guardamos el nick en el sessionStorage
    setuserData(nickInput,difficultyInput, sizeInput, avartarContainer);

    return true;
}


function moviendoImg(e){
    itemImg = e.target;
    console.log(itemImg.src);
}

function cambiarAvatar(e){
    avartarContainer.src = itemImg.src;
}


/**
 * Carga de objetos del DOM, comprobaciones y eventos del formulario
 */
function domReady(){
    //Captura de todos los elements necesarios
    nickInput = document.getElementById('nick');
    sizeInput = document.getElementById('size');
    difficultyInput = document.getElementById('difficulty');
    formEntrada = document.getElementById('formEntrada');
    error = document.getElementById('error');
    //Comprobamos si el hay algun error en el sessionStorage una vez cargado el DOM
    if(sessionStorage.getItem('error')!=null){
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }
    //Inicio de carga de eventos
    formEntrada.addEventListener('submit', comprobarForm);

    //Guarda los elementos de los avatares en una lista
    avatarItems = document.getElementsByClassName('avatarImgItem');
    //Elementos del drag and drop
    for(let item of avatarItems){
        item.addEventListener('dragstart',moviendoImg);

    }

    //Elemento donde se suelta la imagen
    avartarContainer = document.getElementById('avatarBig');
    //Evento para evitar que se ejecute el evento por defecto
    avartarContainer.addEventListener('dragover', e=> {e.preventDefault()});
    //Evento para soltar la imagen
    avartarContainer.addEventListener('drop', cambiarAvatar);

}



document.addEventListener('DOMContentLoaded',domReady)



