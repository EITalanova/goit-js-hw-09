const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let interval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function getColorBody(evt) {
  body.style.backgroundColor = getRandomHexColor();
}

function changeColor(evt) {
  interval = setInterval(getColorBody, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopChangeColor() {
  clearInterval(interval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', stopChangeColor);
