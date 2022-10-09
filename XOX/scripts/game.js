function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won!, <span id="winner-name">PLAYER NAME</span>';
  gameOverElement.style.display = "none";
  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}
function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please Enter Valid Usernames");
    return;
  }

  resetGameStatus();
  //activePlayerNameElement.textContent = "hello";
  activePlayerNameElement.textContent = players[activePlayer % 2].name;
  gameAreaElement.style.display = "block";
}

function selecGameField(event) {
  if (event.target.tagName !== "LI" && gameIsOver) {
    return;
  }
  // activePlayerNameElement.textContent = "abadrakadabra";
  console.log(activePlayerNameElement.textContent);
  const selectedColumn = event.target.dataset.col - 1;
  const selectedRow = event.target.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] != 0) {
    alert("Please select an empty field!");
    return;
  }
  event.target.textContent = players[activePlayer % 2].symbol;
  event.target.classList.add("disabled");
  gameData[selectedRow][selectedColumn] = (activePlayer % 2) + 1;
  const winnerId = checkForGameOver();
  console.log(winnerId);
  if (winnerId !== 0) {
    endGame(winnerId);
    return;
  }
  currentRound++;
  console.log(winnerId);
  activePlayer++;
  activePlayerNameElement.textContent = players[activePlayer % 2].name;
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] !== 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      console.log("will return in 47");
      return gameData[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] !== 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      console.log("will return in 58");
      return gameData[0][i];
    }
  }

  if (
    gameData[0][0] !== 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    console.log("will return in 67");
    return gameData[0][0];
  }

  if (
    gameData[0][2] !== 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    console.log("will return in 76");
    return gameData[0][2];
  }

  if (currentRound === 9) {
    return -1;
  }
  console.log("will return in 83");
  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    gameOverElement.firstElementChild.firstElementChild.textContent =
      players[winnerId - 1].name;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}
