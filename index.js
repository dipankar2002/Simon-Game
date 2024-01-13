
// creat a array for chose the game colors
var gamePattern = [];
// main colors array
var buttonColours = ["red", "blue", "green", "yellow"];
// array for the the user colors secquence
var userClickedPattern = [];

var level = 0;

var start = false;
// function to play sound for the triggered button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// function for the user to use keypress eventListener
$(document).keypress(function() {
  $("h1").text("Level - " + level);
// if statement for check the game started or not
  if(!start) {
    $("h1").text("Level - " + level);
    nextSequence();
    start = true;
  }
});
// function for the game comp color selection sequence
function nextSequence() {

  userClickedPattern = [];

  level++;
  $("h1").text("Level - " + level);

  var randomNum = Math.floor((Math.random() * 4));

  var randomChosenColour = buttonColours[randomNum];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  $("h1").text("Level - " + level);

};

$(".btn").click(function handelar() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour)

  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 250);
};

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
};

function startOver() {
  level = 0;

  gamePattern = [];

  start = false;
}