// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];


// Event Listeners
eventListeners();
function eventListeners(){
    // Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse( localStorage.getItem("tweets") || [] );
        crearHTML();
    } );

    //Cuando el usuario agrega 1 tweet
    formulario.addEventListener("submit", agregarTweet);

}


// Funcionmes

function agregarTweet(e){
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector("#tweet").value;

    // Validacion
    if(tweet === ""){
        errorMensaje("Un mensaje no puede ir vacio");
        return;
    }

    // Añadir al arreglo de tweets
    const tweetObj = {
        id: Date.now(),
        tweet
    }
    tweets = [...tweets, tweetObj];

    // Una vez agregado Muestra el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();

}


function errorMensaje(error){
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");
    
    // Insertarlo en el contenido
    const insertarMensaje = document.querySelector("#contenido");
    insertarMensaje.appendChild(mensajeError);
    
    // Elimina la alerta despues de 2 segundos
    setTimeout( () =>{
        mensajeError.remove();
    }, 2000)
}

// function eliminarError(){
//     const mensajeError = document.querySelector(".error");
//     if(mensajeError){
//         mensajeError.remove();
//     }
// }

function crearHTML(){

limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet => {
            //Agregar boton de eliminar
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.textContent = "X";

            // Añadir la funcion de eliminar tweet
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement("li");

            // Añadir texto
            li.textContent = tweet.tweet;

            // Añadir boton eliminar
            li.appendChild(btnEliminar);

            // insertarlo en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();

}

function sincronizarStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Borrar tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id );
    crearHTML();
}

//Limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}