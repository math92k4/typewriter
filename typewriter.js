"use strict";

// Gobal variables
let nthChar = 0;
let text = null;
let textLength = null;

//Load listener
document.addEventListener("DOMContentLoaded", init);

//Set up
function init() {
  text = document.querySelector(".typewritten").textContent.trim();
  textLength = text.substring().length;
  document.querySelector(".typewritten").textContent = "";
  document.querySelector("#startbutton").addEventListener("click", output);
}

//Output
function output() {
  document.querySelector("#startbutton").removeEventListener("click", output);

  const container = document.querySelector(".typewritten");
  container.textContent = text.substring(0, nthChar + 1);

  sound();

  if (nthChar + 1 < textLength) {
    nthChar++;
    rndTimer();
  }
}

//Random timer
function rndTimer() {
  const rndTime = Math.floor(Math.random() * 3 + 3) * 100;
  setTimeout(output, rndTime);
}

//Choosing sound
function sound() {
  const rndSound = Math.floor(Math.random() * 2) + 1;
  const isThisSpace = text.substring().charAt(nthChar);
  let sound = null;

  if (isThisSpace === " ") {
    sound = document.querySelector("#typespace");
  } else if (nthChar + 1 == textLength) {
    sound = document.querySelector("#typelast");
  } else {
    sound = document.querySelector("#typekey" + rndSound);
  }

  sound.volume = 0.4;
  sound.currentTime = 0;
  sound.play();
}
