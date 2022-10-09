const gameTable = document.querySelector('table');
const timer = document.querySelector('div span');
const resetButton = document.getElementById('reset-button');
const asideElement = document.querySelector('aside');
const backdropElement = document.getElementById('backdrop');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const noteButton = document.getElementById('note-button');
let gameData = [];
let constGameData = [];
let isClicked = false;

for (let i = 0; i < 9; i++) {
  gameData[i] = new Array(9);
  constGameData[i] = new Array(9);
}
let hr = (min = sec = ms = '0' + 0),
  startTimer;

// document.addEventListener('DOMContentLoaded', () => {
//   startTimer = setInterval(() => {
//     ms++;
//     ms = ms < 10 ? '0' + ms : ms;
//     if (ms === 100) {
//       sec++;
//       sec = sec < 10 ? '0' + sec : sec;
//       ms = '0' + 0;
//     }
//     if (sec === 60) {
//       min++;
//       min = min < 10 ? '0' + min : min;
//       sec = '0' + 0;
//     }
//     if (min === 60) {
//       hr++;
//       hr = hr < 10 ? '0' + hr : hr;
//       min = '0' + 0;
//     }
//     putValue();
//   }, 10);
// });

document.addEventListener('DOMContentLoaded', () => {
  let i = 0,
    j = 0;
  for (let row of gameTable.rows) {
    for (let cell of row.cells) {
      gameData[i][j] = cell.firstElementChild.value;
      constGameData[i][j] = cell.firstElementChild.value;
      // console.log(cell.firstElementChild.value);
      j++;
    }
    i++;
  }
});

gameTable.addEventListener('input', (event) => {
  if (!isClicked) {
    if (event.target.value < 10 && event.target.value > 0) {
      console.log(event.target.value);

      const rowInput = event.target.dataset.row;
      const colInput = event.target.dataset.col;
      if (!event.target.value.match(/^[0-9]/)) {
        event.target.value = '';
        return;
      }
      gameData[rowInput - 1][colInput - 1] = event.target.value;
    }
  } else if (isClicked) {
    // event.target.value = '';
    addNote(event);
  }
});
gameTable.addEventListener('click', (event) => {
  clearHighlighted();
  if (event.target.value) {
    const key = event.target.value;

    for (let row of gameTable.rows) {
      for (let cell of row.cells) {
        if (cell.firstElementChild.value === key) {
          cell.firstElementChild.classList.add('highlighted');
        }
      }
    }
  }
});

resetButton.addEventListener('click', () => {
  asideElement.style.display = 'block';
  backdropElement.style.display = 'block';

  // gameTable   ("clicked", (event) => {
  //   if (event.target.value === "") {
  //     alert("its empty");
  //   }
  // });
});
yesButton.addEventListener('click', () => {
  closeOverlay();
  let i = 0,
    j = 0;
  for (let row of gameTable.rows) {
    for (let cell of row.cells) {
      gameData[i][j] = constGameData[i][j];
      cell.firstElementChild.value = constGameData[i][j];

      j++;
    }
    i++;
  }
  hr = min = sec = ms = '0' + 0;
});

noButton.addEventListener('click', closeOverlay);

noteButton.addEventListener('click', (event) => {
  if (isClicked === false) {
    noteButton.classList.add('button-clicked');
    isClicked = true;
  } else {
    isClicked = false;
    noteButton.classList.remove('button-clicked');
  }
});

function putValue() {
  document.getElementById('millisecond').innerText = ms;
  document.getElementById('second').innerText = sec;
  document.getElementById('minute').innerText = min;
  document.getElementById('hour').innerText = hr;
}

function clearHighlighted() {
  for (let row of gameTable.rows) {
    for (let cell of row.cells) {
      cell.firstElementChild.classList.remove('highlighted');
    }
  }
}

function closeOverlay() {
  asideElement.style.display = 'none';
  backdropElement.style.display = 'none';
}

function addNote(event) {
  const inputNumber = document.createElement('p');
  event.target.classList.add('noted-number');
  // inputNumber.classList.add('noted-number');
  inputNumber.textContent = event.target.value;
  event.target.appendChild(inputNumber);
  console.log(event.target);

  // event.target.value;
}
