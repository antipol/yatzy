//FIRST SCREEN

//to toggle visibility of navbar
const navButton = document.getElementById("navMenu");
const toggleNav = e => {
  const menu = document.querySelector("nav ul");
  menu.classList.toggle("shown");
};
// navButton.addEventListener("click", toggleNav);


//to toggle visibility of rules on first screen
const rulesButton = document.getElementById("rulesButton");
const toggleRules = e => {
  const rulesText = document.getElementById("rulesText");
  rulesText.classList.toggle("shown");
};
// rulesButton.addEventListener("click", toggleRules);



//to toggle info about how many players can play
const playerInfoButton = document.getElementById("playerInfoButton");
const togglePlayerInfo = e => {
  const playersText = document.getElementById("playersText");
  playersText.classList.toggle("shown");
};
// playerInfoButton.addEventListener("click", togglePlayerInfo);



//to add or subtract players when user clicks on + or -
const add = document.getElementById("addPlayer");
const sub = document.getElementById("subtractPlayer");

const numOfPlayers = document.getElementById("playerNum");

const addPlayer = e => {
  if (numOfPlayers.value < 10) numOfPlayers.value++;
};
// add.addEventListener("click", addPlayer);

const subtractPlayer = e => {
  if (numOfPlayers.value > 1) numOfPlayers.value--;
};
// sub.addEventListener("click", subtractPlayer);


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

// nextButton.addEventListener("click", next);



//SECOND SCREEN
//player info

//To enter names of players
const playerArr = [];

class Player {
  constructor(name) {
    this.name = name;
    this.aces = 0;
    this.twos = 0;
    this.threes = 0;
    this.fours = 0;
    this.fives = 0;
    this.sixes = 0;
    this.collectTotal = 0;
    this.collectBonus = 0;
    this.onePair = 0;
    this.twoPair = 0;
    this.threeOfKind = 0;
    this.fourOfKind = 0;
    this.lowStraight = 0;
    this.highStraight = 0;
    this.fullHouse = 0;
    this.chance = 0;
    this.yatzy = 0;
    this.total = 0;
  }
}

const playButton = document.getElementById("play");
const playerNames = e => {
  const allNames = document.querySelectorAll(".player-container input");
  for (let i = 0; i < playersNum; i++) {
    playerArr.push(new Player(`${allNames[i].value}`));
  }
  console.log(playerArr);
};

// playButton.addEventListener("click", playerNames);




//Variables
export { navButton, rulesButton, playerInfoButton, add, sub, nextButton, playButton }
//Functions
export { toggleNav, toggleRules, togglePlayerInfo, addPlayer, subtractPlayer, next, playerNames }
