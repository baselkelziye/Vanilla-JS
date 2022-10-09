const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.querySelector('h2');
const overlayDiv = document.getElementById('overlay');
const asideOverylay = document.querySelector('aside');
const scoreSpan = document.getElementById('score-span');
const retryButton = document.getElementById('retry-button');
let score = 0;

scoreElement.textContent = 'Score: ' + score;

let len = 1;
var gameGrid = [];
for (let i = 0; i < 10; i++) {
  gameGrid[i] = new Array(10);
}
const snakePath = [];
let direction = 'ArrowRight';
const tail = {
  xInfo: 2,
  yInfo: 1,
};

let appleInfo = {
  xInfo: null,
  yInfo: null,
};

snakePath.push({ xInfo: 4, yInfo: 1, rgbColor: 'rgb(254,45,0)' });
let headInfo = {
  xInfo: 6,
  yInfo: 1,
};
placeApple();

snakePath.push({ xInfo: 3, yInfo: 1, rgbColor: 'rgb(254,138,0)' });

// ctx.fillStyle = style;

function adjustSnakeCordinates(direction) {
  tail.xInfo = snakePath[snakePath.length - 1].xInfo;
  tail.yInfo = snakePath[snakePath.length - 1].yInfo;
  for (let i = snakePath.length - 1; i > 0; i--) {
    snakePath[i].xInfo = snakePath[i - 1].xInfo;
    snakePath[i].yInfo = snakePath[i - 1].yInfo;
  }
  switch (direction) {
    case 'ArrowDown':
      snakePath[0].yInfo++;

      break;

    case 'ArrowLeft':
      snakePath[0].xInfo--;

      break;
    case 'ArrowUp':
      snakePath[0].yInfo--;

      break;
    case 'ArrowRight':
      snakePath[0].xInfo++;

      break;
  }
  headInfo.xInfo = snakePath[0].xInfo;
  headInfo.yInfo = snakePath[0].yInfo;

  displaySnake();
  eatApple();
  // displaySnake();
}

function generateRandomRGB() {
  return (
    'rgb(' +
    Math.floor(Math.random() * 255) +
    ',' +
    Math.floor(Math.random() * 255) +
    ',' +
    Math.floor(Math.random() * 255) +
    ')'
  );
}

function displaySnake() {
  ctx.beginPath();
  ctx.clearRect(tail.xInfo * 30, tail.yInfo * 30, 30, 30);
  for (const block of snakePath) {
    block.rgbColor = generateRandomRGB();
    ctx.fillStyle = block.rgbColor;
    // ctx.fillStyle = 'rgb(0,0,255)';
    ctx.fillRect(block.xInfo * 30, block.yInfo * 30, 30, 30);
  }
  ctx.closePath();
}

function placeApple() {
  let itsPlaced = true;
  while (itsPlaced) {
    let isFilled = false;
    const xRandom = Math.floor(Math.random() * 10);
    const yRandom = Math.floor(Math.random() * 10);

    for (const block of snakePath) {
      if (xRandom === block.xInfo && yRandom === block.yInfo) {
        isFilled = true;
      }
    }
    if (!isFilled) {
      ctx.fillStyle = 'rgb(0,0,0)';
      ctx.fillRect(xRandom * 30, yRandom * 30, 30, 30);
      appleInfo.xInfo = xRandom;
      appleInfo.yInfo = yRandom;
      return;
    }
  }
}

displaySnake();

function gameIsOver() {
  for (const block of snakePath) {
    if (
      block.xInfo >= 10 ||
      block.yInfo >= 10 ||
      block.xInfo < 0 ||
      block.yInfo < 0
    ) {
      scoreSpan.textContent = 'Your Score ' + score;
      overlayDiv.style.display = 'block';
      asideOverylay.style.display = 'block';
      return true;
    }
  }

  for (let i = 0; i < snakePath.length - 1; i++) {
    for (let j = i + 1; j < snakePath.length; j++) {
      if (
        snakePath[i].xInfo === snakePath[j].xInfo &&
        snakePath[i].yInfo === snakePath[j].yInfo
      ) {
        scoreSpan.textContent = 'Your Score ' + score;
        overlayDiv.style.display = 'block';
        asideOverylay.style.display = 'block';
        console.log('collision', snakePath);
        // alert('Collision happens!');
        return true;
      }
    }
  }
  return false;
}
document.addEventListener('keydown', (event) => {
  if (
    //while moving right block left move etc
    (direction === 'ArrowRight' && event.key === 'ArrowLeft') ||
    (direction === 'ArrowLeft' && event.key === 'ArrowRight') ||
    (direction === 'ArrowUp' && event.key === 'ArrowDown') ||
    (direction === 'ArrowDown' && event.key === 'ArrowUp')
  ) {
    return;
  }

  if (
    //checking for valid keyboard input
    event.key !== 'ArrowRight' &&
    event.key !== 'ArrowLeft' &&
    event.key !== 'ArrowUp' &&
    event.key !== 'ArrowDown'
  ) {
    return;
  }
  direction = event.key;
  // adjustSnakeCordinates(direction);
});
// function playGame() {
//   while (!gameIsOver()) {}
// }

function runGame() {
  setTimeout(function () {
    adjustSnakeCordinates(direction);
    if (gameIsOver()) {
      console.log(snakePath);
      console.log('game is over');
      return;
    }
    runGame();
  }, 350);
}
function eatApple() {
  let newBlockX, newBlockY;

  if (
    headInfo.xInfo === appleInfo.xInfo &&
    headInfo.yInfo === appleInfo.yInfo
  ) {
    if (
      snakePath[snakePath.length - 1].yInfo ===
      snakePath[snakePath.length - 2].yInfo //&&
    ) {
      if (
        snakePath[snakePath.length - 1].xInfo >
        snakePath[snakePath.length - 2].xInfo
      ) {
        newBlockX = snakePath[snakePath.length - 1].xInfo; //
        newBlockY = snakePath[snakePath.length - 1].yInfo;
        newBlockX++;
      } else {
        newBlockX = snakePath[snakePath.length - 1].xInfo;
        newBlockY = snakePath[snakePath.length - 1].yInfo;
        newBlockX--;
      }
    } else {
      if (
        //x == x y-1 > y-2
        snakePath[snakePath.length - 1].yInfo >
        snakePath[snakePath.length - 2].yInfo
      ) {
        newBlockX = snakePath[snakePath.length - 1].xInfo;
        newBlockY = snakePath[snakePath.length - 1].yInfo; //
        newBlockY++;
      } else {
        newBlockX = snakePath[snakePath.length - 1].xInfo;
        newBlockY = snakePath[snakePath.length - 1].yInfo;
        newBlockY--;
      }
    }
    if (newBlockX > 0 && newBlockX <= 10 && newBlockY > 0 && newBlockY <= 10) {
      snakePath.push({
        xInfo: newBlockX,
        yInfo: newBlockY,
        rgbColor: generateRandomRGB(),
      });
      console.log('valid eat');
      tail.xInfo = newBlockX;
      tail.yInfo = newBlockY;
      score++;
      scoreElement.textContent = 'Score: ' + score;
    }

    //clear board then display apple + snake
    clearBoard();
  }
}

function clearBoard() {
  ctx.clearRect(300, 300, 30, 30);
  ctx.beginPath();
  displaySnake();
  placeApple();
  ctx.closePath();
}

retryButton.addEventListener('click', () => {
  clearSnakeAndApple();
  direction = 'ArrowRight';
  score = 0;
  scoreElement.textContent = 'Score: ' + score;
  headInfo.xInfo = 4;
  headInfo.yInfo = 1;
  appleInfo.xInfo = null;
  appleInfo.yInfo = null;

  snakePath.length = 0;
  overlayDiv.style.display = 'none';
  asideOverylay.style.display = 'none';

  snakePath.push({ xInfo: 4, yInfo: 1, rgbColor: 'rgb(254,45,0)' });
  snakePath.push({ xInfo: 3, yInfo: 1, rgbColor: 'rgb(254,138,0)' });
  clearBoard();
  runGame();
});

function clearSnakeAndApple() {
  for (const block of snakePath) {
    ctx.clearRect(block.xInfo * 30, block.yInfo * 30, 30, 30);
  }
  ctx.clearRect(appleInfo.xInfo * 30, appleInfo.yInfo * 30, 30, 30);
}

runGame();
