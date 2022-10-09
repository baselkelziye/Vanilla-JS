function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid; //+"1" => 1
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errosOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event) {
  event.preventDefault(); //prevends the form submit
  const formData = new FormData(event.target); //creates the form with the targetted form
  const enteredPlayername = formData.get("playername").trim(); // trim removes white spaces between and after the string
  //name in the input element
  if (!enteredPlayername) {
    event.target.firstElementChild.classList.add("error");
    errosOutputElement.textContent = "Please enter a valid name!";
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;
  players[editedPlayer - 1].name = enteredPlayername;
  closePlayerConfig();
}
