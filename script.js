let snakeContainer = document.getElementById('id')
snakeCanvas.width = snakeContainer.offsetWidth - 60;
snakeCanvas.height = snakeCanvas.width / 2.5;
const blocksX = 40;
const blocksY = 16; 
const pixelsPerBlock = snakeCanvas.height / blocksY;
let centerX = (Math.ceil(blocksX / 2) - 1) * pixelsPerBlock;
let centerY = (Math.ceil(blocksY / 2) - 1) * pixelsPerBlock;
const eventKeysToDirection ={
  w: 'up',
  a: 'left',
  s: 'down',
  d: 'right'
  ArrowRight: 'right',
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowDown: 'down'
};

const oppositeDirections = {
  right: 'left',
  left: 'right',
  up: 'down',
  down: 'up'
};