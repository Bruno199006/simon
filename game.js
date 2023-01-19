let userClickedPattern = []; //ARRAY

let gamePattern = []; //ARRAY

const buttonColours = ["red", "blue", "green", "yellow"]; //ARRAY

let started = false;

let level = 0;

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    $("#level-title").text("level " + level);
    started = true;
  }
});

$(".btn").click(function () {
  const userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour); //SE AGREGA LA VARIABLE A EL ARRAY

  playSound(userChosenColour); //FUNCION PARA SONIDOS//FUNCION CREADA ABAJO
  animatePress(userChosenColour); //FUNCION PARA ANIMACION DE BOTON PRESIONADO//FUNCION CREADA ABAJO
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];

  const randomNumber = Math.floor(Math.random() * 4); //NUMERO RANDOM ENTRE 0 Y 3

  const randomChosenColour = buttonColours[randomNumber]; //NUMERO RANDOM APLICADO EN EL ARRAY PARA SELECCIONAR COLORES RANDOM

  level++;

  $("#level-title").text("level " + level);

  $("#" + randomChosenColour) //CON JQUERY SELECCIONAMOS EL #ID Y LE AGREGAMOS LA ANIMACION
    .fadeOut(100)
    .fadeIn(100);

  gamePattern.push(randomChosenColour); //SE AGREGA LA VARIABLE A EL ARRAY CON PUSH
  //console.log(randomChosenColour); //REGISTRO EN CONSOLA
  //console.log({ gamePattern }); //REGISTRO EN CONSOLA
  playSound(randomChosenColour);
  return randomChosenColour; //RETORNA EL VALOR DE LA VARIABLE
}
//funcion que habilita sonidos a cada boton
function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3"); //codigo variable se usa la funcion con parametro
  audio.play();
}
function playWrongSound() {
  //codigo hardcoded sound/wrong.mp3
  //funcion que reproduce el sonido de "perdiste"
  const audio = new Audio("sound/wrong.mp3");
  audio.play();
}
function restartTheGameText() {
  //funcion que cambia el h1 para volver al inicio
  $("#level-title").text("Game Over, Press Any Key to Restart");
}
function wrongRedScreen() {
  //funcion que muestra pantallazo rojo al perder
  $("body").addClass("game-over");

  setTimeout(function () {
    //funcion que reseta el pantallazo rojo luego de 200 milisegundos
    $("body").removeClass("game-over");
  }, 200);
}
function startOver() {
  //funcion que resetea los valores level,gamePattern y started
  level = 0;
  gamePattern = [];
  started = false;
}

//Animaciones para los botones usando jquery con la funcion animatePress
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed"); //AGREGA CLASE

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed"); //REMUEVE CLASE 100 MILISEGUNDOS
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 400);

      return;
    }
  } else {
    //playWrongSound();
    playSound("wrong");
    wrongRedScreen();
    restartTheGameText();
    startOver();
  }
}
