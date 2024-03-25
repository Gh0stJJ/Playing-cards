/*
    JS para la gestión del juego
*/

//VARIABLES GLOBALES
var iniciadoMarcado = true;
var adyacentes = [];
var colorInicial = '';
var idMarcadas = [];
//Diccionario de penalizacione por dificultad
const penalizaciones = {
    '1': 0,
    '2': 0.75,
    '3': 0.40,
};





//Contenido de las cartas
var cards = ['raw1', 'raw2', 'raw3', 'raw4', 'raw5', 'raw6', 'raw7', 'raw8', 'raw9', 'raw10','raw11', 'raw12', 'raw13'];




function setUserData(){
    // Set the user data
    document.getElementById('nick').value = nick;
    document.getElementById('avatarImg').src = avatarImg;


}

//Crear grid del juego

function createGrid(){
    //Alteramos la hoja de estilos
    document.getElementById('juego').style.gridTemplateColumns = 'repeat('+size+', 1fr)';
    document.getElementById('juego').style.gridTemplateRows = 'repeat('+size+', 1fr)';
    console.log('Grid creado');
    console.log('Tamaño del tablero: '+size);
}

//Pintar el panel de juego

function paintGamePanel(){

    //Asignamos de forma aleatoria las parejas de cartas a las posiciones del tablero
    let num = Math.round(size*size/2); //Numero de parejas
    let cardsArray = [];
    //Elegimos las cartas de forma aleatoria
    for (let i = 0; i < num; i++) {
        let rand = Math.floor(Math.random() * cards.length);
        if (cardsArray.includes(cards[rand])) {
            i--;
            continue; //Saltamos la iteracion
        }
        cardsArray.push(cards[rand]);
    }
    //Duplicamos las cartas
    cardsArray = cardsArray.concat(cardsArray);
    //Barajamos las cartas
    cardsArray = cardsArray.sort(function() {return Math.random() - 0.5});
    console.log(cardsArray);

    //Crear cartas volteadas
    let items = '';

    for (let i = 0; i < size*size; i++) {
        items += '<div class="containerItem" draggable="false"><img id='+i+' class="item" src="/Images/backCard.png" height="145" alt="itemImg"  draggable="false"><img id="hidden'+i+'" class="hiddenitem" src="Images/'+cardsArray[i]+'.png" height="145" alt="itemImg"  draggable="false"></img></img></div>';
        document.getElementById('juego').innerHTML = items;
    }
}


//Funciones del juego

/**
 * Iniciar el marcado de las cartas
 * @param {*} e 
 */
function marcarItem(e){
    
    console.log('Tiempo de penalizacion: '+tiempo);

    if (iniciadoMarcado){
        let hijo = e.target;
        //Guardamos el color inicial
        colorInicial = hijo.classList[1];
        selectItem(hijo);
        
        //Guardamos el id de la carta
        idMarcadas.push(hijo);
    }

    if (idMarcadas.length == 2){
        
        console.log('Ya se han marcado dos cartas');
        //Desactivamos el evento de marcar
        iniciadoMarcado = false;
        for (let item of idMarcadas) {
            item.style.border = 'none';
            voltearCarta(item);
        }

        //Delay de 1 segundo
        setTimeout(function(){
            //tiempo de delay
            
            ocultarCarta(idMarcadas[0]);
            ocultarCarta(idMarcadas[1]);
            idMarcadas = [];
            iniciadoMarcado = true;
        }, tiempo);
        

    }
}


/**
 * Marca la carta con un borde
 * @param {*} item 
 */
function selectItem(item){
    //Resaltamos el borde de la carta
    item.style.border = '2px solid #FF0000';
    //Bordes redondeados
    item.style.borderRadius = '10px';

    
}

/**
 * Voltea la carta para mostrar su cara
 * @param {*} item 
 */
function voltearCarta(item){
    //Voltear carta
    let itemId = item.id;
    
    let hiddenItem = document.getElementById('hidden'+itemId);
    hiddenItem.style.opacity = '1';
    hiddenItem.style.zIndex = '2';
}

/**
 * Voltea la carta ocultar su cara
 * @param {*} item 
 */
function ocultarCarta(item){
    //Ocultar carta
    let itemId = item.id;
    
    let hiddenItem = document.getElementById('hidden'+itemId);
    hiddenItem.style.opacity = '0';
    hiddenItem.style.zIndex = '1';
}

/**
 * Finalizar marcando items
 * @param {*} e 
 */
function finalizarMarcado(e){
    
    
    
    adyacentes = [];
    //Calculamos la puntuacion
    let puntuacionInput = document.getElementById('puntuacion');
        
        


    
    console.log('Marcado finalizado', iniciadoMarcado);

}


function gameEvents(){
    //Eventos del juego
    const items = document.getElementsByClassName('item');

    for (let item of items) {
        item.addEventListener('mousedown', marcarItem);
        //Prevenir que el item sea arrastrado
        item.addEventListener('dragstart', function(e){
            e.preventDefault();
        });
    }
    //Evento para dejar de marcar (Se lo vincula a todo el documento)
    document.addEventListener('mouseup', finalizarMarcado);


}

/*
** MAIN
*/

// Get the user data
getuserData();

let tiempo = 1000*penalizaciones[difficulty];
//Guardamos el historial de usuario en el localStorage
userHistory();
//Comprobamos si el usuario ya ha introducido su nombre
//Usaremos Windows location para redirigir al usuario a la página de inicio si no ha introducido su nombre
if(!checkuserData()){
    location = "index.html";
}

// Set the user data
setUserData();

//Crear grid del juego
createGrid();

//Pintar el panel de juego  
paintGamePanel();

//Eventos del juego
gameEvents();


