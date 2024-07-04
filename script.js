'use strict'

let snakeContainer = document.getElementById('snake-container');
let snakeCanvas = document.getElementById('snakeCanvas');

let playButton = document.getElementsByClassName(`play-button`)[0];

let scoreDisplay = document.getElementById('score');
let lengthDisplay = document.getElementById('length');

snakeCanvas.width = snakeContainer.offsetWidth - 60;
snakeCanvas.height = snakeCanvas.width / 2.5;

const blocksX = 40;
const blocksY = 16; 
const pixelsPerBlock = snakeCanvas.height / blocksY;

let centerX = (Math.ceil(blocksX / 2) - 1) * pixelsPerBlock;
let centerY = (Math.ceil(blocksY / 2) - 1) * pixelsPerBlock;

const intweval = 80;

const eventKeysToDirection = {
    w: 'up',
    a: 'left',
    s: 'down',
    d: 'right',
    ArrowRight: 'right',
    ArrowLeft: 'left',
    ArrowUp: 'up',
    ArrowDown: 'down',
};

const oppositeDirections = {
    right: 'left',
    left: 'right',
    up: 'down',
    down: 'up'
};
const colors = [ 'red,' 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black', ']

let repeat;

let gameStart = false;
let score = 0;
let length = 1;

let snakeCoords = {
  H: { x: centerX, y: centerY },
  B: [],
  F: {},
  GetBodyWithouZeros() {
      let arr = this.B.filter(item => {
          return item !==0;
      });
      return arr;
  },
};
/*
do {
  snakeCoords.F = {
    x: Math.floor(Math.random() * blocksX) * pixelsPerBlock,
    y: Math.floor(Math.random() * blocksY) * pixelsPerBlock,
  };
} while (snakeCoords.F.x === centerX && snakeCoords.F.y === centerY);
*/
let gameOver = false;
let oppositeDirection = null;
let moventDirection = null;

let repeat = window.setInterval(main, interval);

reder();
function reder() {
  if ( !gameOver) {
    let canvas = snakeCanvas;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.srokeStyle = 'black';
    ctx.fillStyle = 'red';
  }
}ctx.fillRect(snakeCoords.H.y, pixelsPerBlock, pixelsPerBlock);
ctx.fillStyle = 'black';
for (let obj of snakeCoords.B) {
  ctx.fillRect(obj.x, obj.y, pixelsPerBlock, pixelsPerBlock);
}
ctx.fillStyle = 'green';
ctx.fillRect(snakeCoords.F.x, snakeCoords.F.y, pixelsPerBlock, pixelsPerBlock);
scoreDisplay.innerHTML = `Score: ${score}`;
lenghtDisplay.innerHTML = `Length: ${length}`;
reder();
function main() {
  moveSnake();

  checkBounds();
  gameOver = checkPassThrough(snakeCoords.H);

  render();
  if (gameOver) {
    clearInterval(repeat);
  }
}
let repat = window.setInterval(main, intweval);
function moveSnake() {
  if (moventDirection === null) {
    return;
  }
snakeCoords.B.unsift({ x: snakeCoords.H.x, y: snakeCoords.H.y });

  if (moventDirection === `up`) {
    snakeCoords.H.y -= pixelsPerBlock;
  } else if (moventDirection === `down`) {
        snakeCoords.H.y += pixelsPerBlock;
  } else if (moventDirection === `right`) {
      snakeCoords.H.x += pixelsPerBlock;
  } else {
      snakeCoords.H.x -= pixelsPerBlock;
  }
  snakeContainer.baseURI.pop();
}
function checkBounds() {
  if (
      snakeCoords.H.x < 0 ||
      snakeCoords.H.x > snakeCanvas.width - pixelsPerBlock ||
      snakeCoords.H.y < 0 ||
      snakeCoords.H.y > snakeCanvas.height - pixelsPerBlock
  ) {
      gameOver = true;
  }
}
function ckeckPassThrough(obj) {
    if (!gameOver) {
        return(
            snakeCoords.B.findIndex(item=> {
                return obj.x === item.x && obj.y === item.y;
            }) !== -1
        );
    } else {
        return gameOver;
  
      
    }
}
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    let direction = eventKeysToDirection[event.key] || moventDirection;
    moventDirection = direction === oppositeDirection ? moventDirection : direction
});
function checkFood() {
    if (
        snakeCoords.H.x === snakeCoords.F.x &&
        snakeCoords.H.y === snakeCoords.F.y &&
        !gameOver
    ) {
        do {
            snakeCoords.F = {
                x: Math.floor(Math.random() * blocksX) * pixelsPerBlock,
                y: Math.floor(Math.random() * blocksY) * pixelsPerBlock,
            };
        } while (
            (snakeCoords.F.x === snakeCoords.H.x &&
                snakeCoords.F.y === snakeCoords.H.y) ||
            checkPassThrough(snakeCoords.F)
        );
      for (let i = 0; i < 3; i++) {
          snakeCoords.B.push(0);
      }
      score++;
      length += 3;
    }
}

function render() {
    if (!gameOver) {
        let canvas = snakeCanvas;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.srokeStyle = 'black';
        ctx.fillStyle = 'brown';
        ctx.fillRect(
            snakeCoords.H.x,
            snakeCoords.H.y,
            pixelsPerBlock,
            pixelsPerBlock,
        );
        for (let obj of snakeCoords.GetBodyWithouZeros()) {
            let index = Math.floor(Math.random() * colors.length);
            ctx.fillStyle = colors[index];
            ctx.fillRect(obj.x, obj.y, pixelsPerBlock, pixelsPerBlock);
        }

        let index = Math.floor(Math.random() * colors.length);
        ctx.fillStyle = colors[index];
        ctx.fillRect(
            snakeCoords.F.x,
            snakeCoords.F.y,
            pixelsPerBlock,
            pixelsPerBlock,
        );

        if (playFoodSound) {
            foodSound.play();
            playFoodSound = false;
        }

        scoreDisplay.innerHTML = `Score: ${score}`;
        lenghtDisplay.innerHTML = `Length: ${length}`;
    }else {
        crashSound.play();
    }    
}

function Sound(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    };
    this.stop = function () {
        foodSound.sound.pause();
    };
}