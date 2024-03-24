/*
    JS para la gestión del juego
*/

//VARIABLES GLOBALES
var iniciadoMarcado = false;
var adyacentes = [];
var colorInicial = '';
var idMarcado = [];
//Diccionario de colores
const colors = ['rojo', 'verde', 'azul', 'amarillo', 'naranja', 'morado'];
//Id del proceso de intervalo
var idInterval;



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
    

    //Pintar el panel de juego
    let items = '';

    for (let i = 0; i < size*size; i++) {
        items += '<div class="containerItem" draggable="false"><img id='+i+' src="/Images/backCard.png" height="145"  draggable="false"></></div>';
        document.getElementById('juego').innerHTML = items;
    }
}


//Funciones del juego

/**
 * Calcula el array de adyacentes
 * @param {*} identificador
 */
function calcularAdyacentes(id){
    adyacentes = [];
    //Adyacente superior
    if (id - size >= 0){
        adyacentes.push(id - size); 
    }

    //Adyacente inferior
    if (id + size < size*size){
        adyacentes.push(id + size);
    }

    //Adyacente izquierdo
    if (id % size != 0){
        adyacentes.push(id - 1);
    }

    //adyacente derecho
    if ((id + 1) % size != 0){
        adyacentes.push(id + 1);
    }
     
    adyacentes.forEach(element => {
        console.log('Adyacente: '+element);
        
    });
    
}

/**
 * Iniciar el marcado de los items
 * @param {*} e 
 */
function marcarItem(e){

    idMarcado = [];
    
    let hijo = e.target;
    //Guardamos el color inicial
    colorInicial = hijo.classList[1];
    selectItem(hijo);
    //Guardamos el id del item marcado
    idMarcado.push(parseInt(hijo.id));

    //Comenzamos a calcular los adyacentes del primer item marcado
    calcularAdyacentes(parseInt(hijo.id));
    
}


/**
 * Marca los items con su color correspondiente
 * @param {*} item 
 */
function selectItem(item){
    let containerItem = item.parentElement
    //Añadimos la clase marcado al item padre
    containerItem.classList.add(item.classList[1]);
    if(!iniciadoMarcado){
        iniciadoMarcado = true;
    }

}


/**
 * Continuar marcando items
 * @param {*} e 
 */
function continuarMarcado(e){
    
    if (iniciadoMarcado){
        console.log('Marcado continuado', iniciadoMarcado);
        let hijo = e.target;
        //Es adyacente ???   Tiene el mismo color inicial ???
        if (adyacentes.includes(parseInt(hijo.id)) && hijo.classList[1] == colorInicial){
            selectItem(hijo);
            
            //Guardamos el id del item marcado
            idMarcado.push(parseInt(hijo.id));
            //Calculamos los adyacentes del nuevo item marcado
            calcularAdyacentes(parseInt(hijo.id));
        }
       
    }

}

/**
 * Finalizar marcando items
 * @param {*} e 
 */
function finalizarMarcado(e){
    
    if (iniciadoMarcado){
        iniciadoMarcado = false;
        adyacentes = [];
        //Calculamos la puntuacion
        let puntuacionInput = document.getElementById('puntuacion');
        
        if (idMarcado.length > 1){
            puntuacionInput.value = parseInt(puntuacionInput.value) + idMarcado.length;
        }



        //Trabajar con los marcados
        idMarcado.forEach(element => {
            //Capturamos el objeto
            let item = document.getElementById(element);
            //Quitamos el color del padre (Rectagulo de color)
            item.parentElement.classList.remove(colorInicial);
            //Cambiamos el color del item de forma aleatoria
            let randColor = Math.floor(Math.random() * 6);
            //Quitamos el color inicial comprobando que el classList no contenga elementos de color
            //Esta cosa arreglara un bug que no me gusta
            for (let color of colors){
                if (item.classList.contains(color)){
                    item.classList.remove(color);
                }
            }
            //Añadimos el nuevo color
            item.classList.add(colors[randColor]);

        });
    }
    console.log('Marcado finalizado', iniciadoMarcado);

}


function gameEvents(){
    //Eventos del juego
    const items = document.getElementsByClassName('item');

    for (let item of items) {
        item.addEventListener('mousedown', marcarItem);
        item.addEventListener('mouseover', continuarMarcado);
        //Prevenir que el item sea arrastrado
        item.addEventListener('dragstart', function(e){
            e.preventDefault();
        });
    }
    //Evento para dejar de marcar (Se lo vincula a todo el documento)
    document.addEventListener('mouseup', finalizarMarcado);

    //Contador de tiempo (Cuenta atras)
    /*idInterval = setInterval(function(){
        let tiempoInput = document.getElementById('tmpo');
        tiempoInput.value = parseInt(tiempoInput.value) - 1;
        if (parseInt(tiempoInput.value) == 0){
            clearInterval(idInterval);
            //Paramos todos los eventos latentes
            for (let item of items) {
                item.removeEventListener('mousedown', marcarItem);
                item.removeEventListener('mouseover', continuarMarcado);
            }
            document.removeEventListener('mouseup', finalizarMarcado);
            
            document.getElementById('juegoAcabado').classList.add('juegoAcabadoColor');
            //Cambiar indices de los paneles
            document.getElementById('juegoAcabado').style.zIndex = '2';
            document.getElementById('juego').style.zIndex = '1';
            //Evento de boton de reinicio
            document.getElementById('nuevaPartida').addEventListener('click', function(){
                location.reload();
            });

        }
    }, 1000); */

}

/*
** MAIN
*/

// Get the user data
getuserData();
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


