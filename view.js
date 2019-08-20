//to toggle visibility of navbar
const navButton = document.getElementById("navMenu");
const toggleNav = e => {
  const menu = document.querySelector("nav ul");
  menu.classList.toggle("shown");
};
navButton.addEventListener("click", toggleNav);




//to toggle visibility of rules on first screen
const rulesButton = document.getElementById("rulesButton");
const toggleRules = e => {
  const rulesText = document.getElementById("rulesText");
  rulesText.classList.toggle("shown");
};
rulesButton.addEventListener("click", toggleRules);



//to toggle info about how many players can play
const playerInfoButton = document.getElementById("playerInfoButton");
const togglePlayerInfo = e => {
  const playersText = document.getElementById("playersText");
  playersText.classList.toggle("shown");
};
playerInfoButton.addEventListener("click", togglePlayerInfo);



//to add or subtract players when user clicks on + or -
const numOfPlayers = document.getElementById("playerNum");
const add = document.getElementById("addPlayer");
const sub = document.getElementById("subtractPlayer");

const addPlayer = e => {
  if (numOfPlayers.value < 10) numOfPlayers.value++;
};
add.addEventListener("click", addPlayer);

const subtractPlayer = e => {
  if (numOfPlayers.value > 1) numOfPlayers.value--;
};
sub.addEventListener("click", subtractPlayer);


//to go to next screen
const nextButton = document.getElementById("nextButton");
let playersNum;
const next = e => {
  const playerItems = document.querySelectorAll(".player-item");
  playersNum = numOfPlayers.value;
  for (let i = 0; i < playersNum; i++) {
    playerItems[i].classList.add("shown");
  }
};

nextButton.addEventListener("click", next);
