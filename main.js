const navButton = document.getElementById("navMenu");
const rulesButton = document.getElementById("rulesButton");
const rulesText = document.getElementById("rulesText");
const playerInfoButton = document.getElementById("playerInfoButton");
const numOfPlayers = document.getElementById("playerNum");
const add = document.getElementById("addPlayer");
const sub = document.getElementById("subtractPlayer");
const nextButton = document.getElementById("nextButton");
const playerItems = document.querySelectorAll(".player-item");
const playButton = document.getElementById("play");

let playersNum;

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



//to toggle visibility of navbar
const toggleNav = e => {
  const menu = document.querySelector("nav ul");
  menu.classList.toggle("shown");
};
navButton.addEventListener("click", toggleNav);

//to toggle visibility of rules on first screen
const toggleRules = e => {
  rulesText.classList.toggle("shown");
};
rulesButton.addEventListener("click", toggleRules);

//to toggle info about how many players can play
const togglePlayerInfo = e => {
  const playersText = document.getElementById("playersText");
  playersText.classList.toggle("shown");
};
playerInfoButton.addEventListener("click", togglePlayerInfo);


//to add or subtract players when user clicks on + or -
const addPlayer = e => {
  if (numOfPlayers.value < 10) numOfPlayers.value++;
};
add.addEventListener("click", addPlayer);

const subtractPlayer = e => {
  if (numOfPlayers.value > 1) numOfPlayers.value--;
};
sub.addEventListener("click", subtractPlayer);


//to go to next screen
const next = e => {
  playersNum = numOfPlayers.value;
  console.log(playersNum);
  for (let i = 0; i < playersNum; i++) {
    playerItems[i].classList.add("shown");
  }
};

nextButton.addEventListener("click", next);




//Second screen / player info

const playerNames = e => {
  const allNames = document.querySelectorAll(".player-container input");
  for (let i = 0; i < playersNum; i++) {
    playerArr.push(new Player(`${allNames[i].value}`));
  }
  console.log(playerArr);
};

playButton.addEventListener("click", playerNames);





class Dice {
  constructor(url, value) {
    this.url = url;
    this.value = value;
  }
}

//links to the dice images and values
const diceLinks = [
  new Dice("images/dice-1.svg", 1),
  new Dice("images/dice-2.svg", 2),
  new Dice("images/dice-3.svg", 3),
  new Dice("images/dice-4.svg", 4),
  new Dice("images/dice-5.svg", 5),
  new Dice("images/dice-6.svg", 6)
];

const diceValues = [];

//get random number between 0 and 5 (images of dice is in array, zero based index)
const randomNum = () => Math.floor(Math.random() * 6);


//generate numbers on dice when roll button is clicked
const rollButton = document.getElementById("rollButton");
const diceImages = document.querySelectorAll(".dice img");
const diceContainer = document.querySelector(".dice");
const rollsLeft = document.getElementById("rollsLeft");

const rollDice = e => {
  if (rollsLeft.innerHTML > 0) {
    rollsLeft.innerHTML = Number(rollsLeft.innerHTML) - 1;
    for (let i = 0; i < 5; i++) {
      let diceEyes = randomNum();
      if (diceImages[i].className === "keep" ) {
        diceImages[i].src = diceImages[i].src;
      } else {
        diceImages[i].src = diceLinks[diceEyes].url;
        diceValues[i] = diceLinks[diceEyes].value;
      }
    }
    if (rollsLeft.innerHTML == 0) {
      checkOptions();
      collectCheck();
      pairCheck();
      ofKindCheck();
      straightsCheck();
      houseChanceCheck();
      yatzyCheck();
    }
  }
}
rollButton.addEventListener("click", rollDice);


//To keep dice and roll the others (not clicked dice) on roll
const keepDice = e => {
  if (e.target.tagName === "IMG") {
    if (e.target.className === "keep") {
      e.target.classList.remove("keep");
    } else {
      e.target.classList.add("keep");
    }
  }
}
diceContainer.addEventListener("click", keepDice);



const checkOptions = () => {
  console.log(diceValues)
}
const collectContainer = document.querySelector(".collect");
const collectButtons = document.querySelectorAll(".collect button")
const pairButtons = document.querySelectorAll(".pairs button");
const ofKindButtons = document.querySelectorAll(".of-a-kind button");
const straightButton = document.querySelectorAll(".straights button");
const houseChanceButtons = document.querySelectorAll(".house-chance button");
const yatzyButton = document.getElementById("yatzyButton");
const potentialScore = document.getElementById("potentialScore");

const collectCheck = () => {
  for (let i = 0; i < 6; i++) {
    if (diceValues.includes(i + 1)) {
      collectButtons[i].style.backgroundColor = "red";
    }
  }
}

const pairCheck = () => {
  let pairs = 0;
  for (let i = 1; i <= 6; i++) {
    if (diceValues.filter(dice => dice === i).length >= 2) {
      pairs += 1;
    }
  }
  if (pairs >= 1) pairButtons[0].style.backgroundColor = "red";
  if (pairs >= 2) pairButtons[1].style.backgroundColor = "red";
}

const ofKindCheck = () => {
  for (let i = 1; i <= 6; i++) {
    if (diceValues.filter(dice => dice === i).length >= 3) {
      ofKindButtons[0].style.backgroundColor = "red";
    }
    if (diceValues.filter(dice => dice === i).length >= 4) {
      ofKindButtons[1].style.backgroundColor = "red";
    }
  }
}

const straightsCheck = () => {
  if (diceValues.includes(1) && diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5)) {
    straightButton[0].style.backgroundColor = "red";
  }
  if (diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5) && diceValues.includes(6)) {
    straightButton[1].style.backgroundColor = "red";
  }
}

const houseChanceCheck = () => {
  let firstFloor = 0;
  let secondFloor = 0;
  for (let i = 1; i <= 6; i++) {
    if (diceValues.filter(dice => dice === i).length === 3) {
      firstFloor += 1;
    }
    if (diceValues.filter(dice => dice === i).length === 2) {
      secondFloor += 1;
    }
  }
  if (firstFloor === 1 && secondFloor === 1) {
    houseChanceButtons[0].style.backgroundColor = "red";
  }
  houseChanceButtons[1].style.backgroundColor = "red";
}

const yatzyCheck = () => {
  for (let i = 1; i <= 6; i++) {
    if (diceValues.every(dice => dice === i)) {
      yatzyButton.style.backgroundColor = "red";
    }
  }
}



//To show possible score when user clicks on different buttons
potentialScore.innerHTML = 0;

const countEyes = e => {
  let eyes = [];
  let result = 0;
  let resultArr = [];
  if (e.target.tagName === "BUTTON") {
    for (let i = 1; i <= 6; i++) {
      eyes = diceValues.filter(dice => dice === i);
      result = eyes.reduce((acc, cur) => {return acc + cur}, 0);
      resultArr.push(result);
    }
    for (let i = 0; i < 6; i++) {
      if (e.target === collectButtons[i]) {
        potentialScore.innerHTML = resultArr[i];
      }
    }
  }
}

collectContainer.addEventListener("click", countEyes);


const countPairEyes = (e) => {
  let pairArr = [];
  let pairs = 0;
  let sortedArr = [];
  if (e.target.tagName === "BUTTON") {
    for (let i = 1; i <= 6; i++) {
      if (diceValues.filter(dice => dice === i).length >= 2) {
        pairArr.push(i);
        pairs += 1;
      }
    }
    sortedArr = pairArr.sort((x, y) => y - x);
    if (e.target === pairButtons[0] && pairs > 0) {
      potentialScore.innerHTML = sortedArr[0] * 2;
    } else if (e.target === pairButtons[1] && pairs > 1) {
      potentialScore.innerHTML = sortedArr[0] * 2 + sortedArr[1] * 2;
    } else {
      potentialScore.innerHTML = 0;
    }
  }
}

document.querySelector(".pairs").addEventListener("click", countPairEyes);
//
