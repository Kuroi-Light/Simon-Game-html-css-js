const buttons = {
  0: document.querySelector(".red"),
  1: document.querySelector(".blue"),
  2: document.querySelector(".green"),
  3: document.querySelector(".yellow")
}
const lvlTitle = document.querySelector("#level-title");

let level = 0;
let gamePattern = [];
let userPattern = [];
let started = false;

document.addEventListener('keydown', function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

for (let i = 0; i < 4; i++) {
  buttons[i].addEventListener('click', function() {
    userPattern.push(this.id);
    playSound(this.id);
    animationNext(i);
    game(userPattern.length - 1);
  });
}

function restart() {
  animationGameOver();
  level = 0;
  gamePattern.length = 0;
  started = false;
}

function nextSequence() {
  userPattern.length = 0;
  level++;
  lvlTitle.innerHTML = "Level " + level;
  let rnd = Math.floor(Math.random() * 4);
  gamePattern.push(buttons[rnd].id);
  animationPress(rnd);
  playSound(buttons[rnd].id);
}

function game(key) {
  if (userPattern[key] !== gamePattern[key]) {
    restart();
  } else {
    if (userPattern.length === gamePattern.length) {
      lvlTitle.innerHTML = "You're right!";
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
}

function animationPress(key) {
  buttons[key].classList.add("blink-in-out");
  setTimeout(function() {
    buttons[key].classList.remove("blink-in-out");
  }, 100);
}

function animationNext(key) {
  buttons[key].classList.toggle("pressed");
  setTimeout(function() {
    buttons[key].classList.toggle("pressed");
  }, 100);
}

function animationGameOver() {
  document.body.classList.toggle("game-over");
  playSound("wrong");
  lvlTitle.innerHTML = "Game Over! Press Any Key to Restart";
  setTimeout(function() {
    document.body.classList.toggle("game-over");
  }, 200);
}

function playSound(color) {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
