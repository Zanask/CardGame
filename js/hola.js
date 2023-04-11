"use strict";
// Variables
var game = document.getElementById("game");
var form = document.getElementById("form");
var menu = document.getElementById("menu");
var datas = document.getElementById("datas");
var playercard = document.getElementById("playercard");
var dealercard = document.getElementById("machinecard");
var nom = document.getElementById("name");
var lastname = document.getElementById("lastname");
var dealerhand = document.getElementById("dealer-hand");
var playerhand = document.getElementById("player-hand");
var life = document.getElementById("hp");
var score = document.getElementById("score");
var timer = document.getElementById("contador");
var puntos = document.getElementById("puntos");
var tiempos = document.getElementById("tiempo");
var playbutton = document.getElementById("play-button");
var menubutton = document.getElementById("menu-button");
var databutton = document.getElementById("data-button");
var hit = document.getElementById("hit-button");
var buton = document.getElementById("btn");
// Variables de control
var errorName = document.getElementById("errorName");
var errorLastname = document.getElementById("errorLastName");
//   Mostramos todos los datos guardados en localstorage
var modelAux;
var addressAux;
var data = localStorage.getItem("data");
if (data == null) {
    data = [];
}
else {
    data = JSON.parse(data);
}
data.forEach(function (data) {
    // Mostramos los datos
    document.querySelector("#data").innerHTML += `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${data.name} ${data.lastname}</h5>
          <p class="card-text">Cartas Sacadas mas Altas: ${data.puntuacion}</p>
          <p class="card-text">Tiempo: ${data.timer}</p>
        </div>
      </div>
            `;
});
// Event
menubutton.addEventListener("click", function () {
    // Recargamos pagina
    location.reload();
});
//Event
playbutton.addEventListener("click", function () {
    // Ocultamos el menu y mostramos el juego
    menu.style.display = "none";
    game.style.display = "block";
    playercard.style.display = "block";
    dealercard.style.display = "block";
});
//Event
databutton.addEventListener("click", function () {
    // Ocultamos el menu y mostramos data
    menu.style.display = "none";
    datas.style.display = "block";
});
// Event
hit.addEventListener("click", function () {
    // Hacemos un random de una baraja y la maquina saca su carta
    // El usuario empieza con 10 vidas, si saca una mas grande que la maquina, gana una vida, si pierde, pierde 3 vidas
    // Si el usuario llega a 0 vidas, pierde
    // Iniciamos timer infinito hasta que acabe la partida, si ya esta iniciado no se vuelve a iniciar
    if (timer.innerHTML == "0") {
        var contador = 0;
        var intervalo = setInterval(function () {
            contador++;
            timer.innerHTML = contador;
            if (parseInt(life.innerHTML) <= 0) {
                clearInterval(intervalo);
            }
        }, 1000);
    }
    // Array de Corazones, picas, diamantes y treboles
    var baraja = ["♥", "♠", "♦", "♣"];
    // Sacamos la carta del jugador
    var cartaJugador = Math.floor(Math.random() * 10) + 1;
    // Sacamos la carta de la maquina
    var cartaMaquina = Math.floor(Math.random() * 10) + 1;
    // Mostramos las cartas
    dealerhand.innerHTML = "Dealer Hand: " + cartaMaquina + baraja[Math.floor(Math.random() * baraja.length)];
    playerhand.innerHTML = "Player Hand: " + cartaJugador + baraja[Math.floor(Math.random() * baraja.length)];
    // Comprobamos quien gana
    if (cartaJugador > cartaMaquina) {
        life.innerHTML = parseInt(life.innerHTML) + 1;
        score.innerHTML = parseInt(score.innerHTML) + 1;
    }
    if (cartaJugador < cartaMaquina) {
        life.innerHTML = parseInt(life.innerHTML) - 3;
    }
    // Comprobamos si el jugador ha ganado
    if (parseInt(life.innerHTML) >= 21) {
        alert("Has ganado");
        tiempos.innerHTML = parseInt(timer.innerHTML);
        puntos.innerHTML = parseInt(score.innerHTML);
        // Mostramos el form y ocultamos el juego
        form.style.display = "block";
        game.style.display = "none";
        playercard.style.display = "none";
        dealercard.style.display = "none";
    }
    // Comprobamos si el jugador ha perdido
    if (parseInt(life.innerHTML) <= 0) {
        alert("Has perdido");
        // Mostramos el form y ocultamos el juego
        form.style.display = "block";
        game.style.display = "none";
        playercard.style.display = "none";
        dealercard.style.display = "none";
    }
});
// Event
buton.addEventListener("click", function () {
    // Control de errores
    //Comprobamos que no haya campos vacios
    if (nom.value == "") {
        errorName.innerHTML = "*Name Required";
    }
    else {
        errorName.innerHTML = "";
    }
    if (lastname.value == "") {
        errorLastname.innerHTML = "*Lastname Required";
    }
    else {
        errorLastname.innerHTML = "";
    }
    // Envio de datos
    if (nom.value != "" && lastname.value != "") {
        var data = {
            name: nom.value,
            lastname: lastname.value,
            puntuacion: parseInt(score.innerHTML),
            timer: parseInt(timer.innerHTML)
        };
        // Cogemos los datos del localstorage y sumamos los nuevos, si no existe, lo creamos
        if (localStorage.getItem("data") == null) {
            localStorage.setItem("data", JSON.stringify([data]));
        }
        else {
            var oldData = JSON.parse(localStorage.getItem("data"));
            oldData.push(data);
            localStorage.setItem("data", JSON.stringify(oldData));
        }
        // Recargamos pagina  
        location.reload();
    }
});
