const startBtn = document.querySelector('#start');
const startOverBtn = document.querySelector('#start-over');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const lives = document.querySelector('#lives');

let time = 0;
let score = 0;
let livesCount = 3;
const colors = [
  '#CF203Eff',
  '#C42546ff',
  '#BA2A4Eff',
  '#AF2F57ff',
  '#A5345Fff',
  '#9A3967ff',
  '#903F6Fff',
  '#854477ff',
  '#7A497Fff',
  '#704E88ff',
  '#655390ff',
  '#5B5898ff',
  '#505DA0ff',
  '#F5C900ff',
  '#E1BB0Cff',
  '#CDAD18ff',
  '#B9A023ff',
  '#A5922Fff',
  '#91843Bff',
  '#7C7647ff',
  '#686853ff',
  '#545A5Fff',
  '#404D6Aff',
  '#2C3F76ff',
  '#183182ff',
];

startBtn.addEventListener('click', event => {
  event.preventDefault();
  screens[0].classList.add('up');
});
startOverBtn.addEventListener('click', event => {
  event.preventDefault();
  window.location.reload();
});
timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = +event.target.getAttribute('data-time');
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', event => {
  livesCounter();
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
    lives.classList.remove('red');
  } else {
    --livesCount;
    lives.classList.add('red');

    console.log(livesCount);
    if (livesCount === -1) {
      finishGame();
      lives.classList.add('hide');
    }
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');

  board.innerHTML = `
    <h1>Score: <span class="primary">${score}</span></h1>
    `;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRandomColor();
  circle.style.background = color;
  (circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`),
    `0 0 50px ${color}`;

  circle.classList.add('circle');
  circle.style.background = `${getRandomColor}`;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function livesCounter() {
  lives.innerHTML = `
    <h1>Lives: <span class="lightBlue" id="lightBlue">${livesCount}</span></h1>
    `;
}

livesCounter();

function winTheGame() {
  function kill() {
    const circle = document.querySelector('.circle');
    if (circle) {
      circle.click();
    }
  }
  setInterval(kill, 42);
}

const win = document.querySelector('.win');
win.addEventListener('click', () => {
  winTheGame()
});
