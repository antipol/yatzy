// Create new dice
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



//get random number between 0 and 5 (images of dice is in array, zero based index)
const randomNum = () => Math.floor(Math.random() * 6);


//generate numbers on dice when roll button is clicked
const rollButton = document.getElementById("rollButton");
const diceImages = document.querySelectorAll(".dice img");
const rollsLeft = document.getElementById("rollsLeft");

let diceValues = [];

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
      collectCheck();
      pairCheck();
      ofKindCheck();
      straightsCheck();
      houseChanceCheck();
      yatzyCheck();
      disableButtons();
    }
  }
}
// rollButton.addEventListener("click", rollDice);



//To keep dice and roll the others (not clicked dice) on roll
const diceContainer = document.querySelector(".dice");
const keepDice = e => {
  if (e.target.tagName === "IMG") {
    if (e.target.className === "keep") {
      e.target.classList.remove("keep");
    } else {
      e.target.classList.add("keep");
    }
  }
}
// diceContainer.addEventListener("click", keepDice);








//Functions to check what options are possible after three rolls - called in rollDice when roll is clicked last time


//to check if dice between 1 and 6 is there to collect
const collectButtons = document.querySelectorAll(".collect button")
const collectCheck = () => {
  for (let i = 0; i < 6; i++) {
    if (diceValues.includes(i + 1)) {
      collectButtons[i].style.backgroundColor = "red";
      collectButtons[i].disabled = false;
    } else {
      collectButtons[i].disabled = true;
    }
  };
}

//To check if one or two pairs is possible
const pairButtons = document.querySelectorAll(".pairs button");
const pairCheck = () => {
  let pairs = 0;
  for (let i = 1; i <= 6; i++) {
    if (diceValues.filter(dice => dice === i).length >= 2) {
      pairs += 1;
    }
  }
  if (pairs >= 1) {
    pairButtons[0].style.backgroundColor = "red";
    pairButtons[0].disabled = false;
  } else {
    pairButtons[0].disabled = true;
  }

  if (pairs >= 2) {
    pairButtons[1].style.backgroundColor = "red";
    pairButtons[1].disabled = false;
  } else {
    pairButtons[1].disabled = true;
  };
}



const sortDice = () => diceValues.sort((x, y) => x - y);
const checkForEquals = (index) => diceValues.filter(dice => dice === index);

//to check if 3 of a kind or 4 of a kind is possible
const ofKindButtons = document.querySelectorAll(".of-a-kind button");
const ofKindCheck = () => {
  for (let i = 1; i <= 6; i++) {
    const checkEquals = checkForEquals(i);
    if (checkEquals.length >= 3) {
      ofKindButtons[0].style.backgroundColor = "red";
    }
    if (checkEquals.length >= 4) {
      ofKindButtons[1].style.backgroundColor = "red";
    }
  }
}

//to check for low or high straight
const straightButton = document.querySelectorAll(".straights button");
const straightsCheck = () => {
  if (diceValues.includes(1) && diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5)) {
    straightButton[0].style.backgroundColor = "red";
  }
  if (diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5) && diceValues.includes(6)) {
    straightButton[1].style.backgroundColor = "red";
  }
}


//to check for full house or chance
const houseCheck = () => {
  let firstFloorFull = false;
  let secondFloorFull = false;
  for (let i = 1; i <= 6; i++) {
    if (checkForEquals(i).length === 3) {
      firstFloorFull = true;
    };
    if (checkForEquals(i).length === 2) {
      secondFloorFull = true;
    };
  };
  if (firstFloorFull && secondFloorFull) {
    return true;
  };
}

const houseChanceButtons = document.querySelectorAll(".house-chance button");
const houseChanceCheck = () => {
  if (houseCheck()) {
    houseChanceButtons[0].style.backgroundColor = "red";
  };
  houseChanceButtons[1].style.backgroundColor = "red";
}

//to check for yatzy
const yatzyCheck = () => {
  for (let i = 1; i <= 6; i++) {
    if (diceValues.every(dice => dice === i)) {
      yatzyButton.style.backgroundColor = "red";
    }
  }
}


//To deactivate buttons if not possible with the dice available
const optionButtons = document.querySelectorAll(".options button");
const disableButtons = () => {
  for (let i = 0; i < optionButtons.length; i++) {
    if (optionButtons[i].disabled !== false) {
      optionButtons[i].disabled = true;
    }
  }
}



//to mark the chosen button before score is added
const options = document.querySelector(".options");
const chosenOption = e => {
  if (e.target.tagName === "BUTTON") {
    for (let i = 0; i < optionButtons.length; i++) {
      if (e.target === optionButtons[i]) {
        optionButtons[i].classList.add("final-pick");
      } else {
        optionButtons[i].classList.remove("final-pick");
      };
    };
  };
}
// options.addEventListener("click", chosenOption);


//To show possible score when user clicks on different buttons
const potentialScore = document.getElementById("potentialScore");
potentialScore.innerHTML = 0;

//to count eyes on dice from 1 to 6 when collected
const collectContainer = document.querySelector(".collect");
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
      };
    };
  };
}
// collectContainer.addEventListener("click", countEyes);

//to count points if one or two pair is possible
const pairContainer = document.querySelector(".pairs");
const countPairEyes = (e) => {
  let pairArr = [];
  let pairs = 0;
  let sortedArr = [];
  if (e.target.tagName === "BUTTON") {
    for (let i = 1; i <= 6; i++) {
      const checkEquals = checkForEquals(i);
      if (checkEquals.length >= 2) {
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
    };
  };
}
// pairContainer.addEventListener("click", countPairEyes);


// // to count how many points if 3 of a kind or 4 of a kind is possible
const ofKindContainer = document.querySelector(".of-a-kind");
const countOfKind = e => {
  if (e.target.tagName === "BUTTON") {
    const ofKindArr = [];
    for (let i = 1; i <= 6; i++) {
      const filterDice = checkForEquals(i);
      if (filterDice.length >= 3) {
        ofKindArr.push(...filterDice);
      };
    };
    if (e.target === ofKindButtons[0] && ofKindArr.length >= 3) {
      potentialScore.innerHTML = ofKindArr[0] * 3;
    } else if (e.target === ofKindButtons[1] && ofKindArr.length >= 4) {
      potentialScore.innerHTML = ofKindArr[0] * 4;
    } else {
      potentialScore.innerHTML = 0;
    }
  };
}
// ofKindContainer.addEventListener("click", countOfKind);


//to count straight points
const lowStraight = [1, 2, 3, 4, 5];
const highStraight = [2, 3, 4, 5, 6];

const countLowStraight = e => {
  sortDice();
  const isLowStraight = diceValues.every((dice, i) => dice === lowStraight[i]);
  isLowStraight ? potentialScore.innerHTML = 15 : potentialScore.innerHTML = 0;
}
// straightButton[0].addEventListener("click", countLowStraight);

const countHighStraight = e => {
  sortDice();
  const isHighStraight = diceValues.every((dice, i) => dice === highStraight[i]);
  isHighStraight ? potentialScore.innerHTML = 20 : potentialScore.innerHTML = 0;
}
// straightButton[1].addEventListener("click", countHighStraight);


//to count points when full house is achieved
const houseButton = document.getElementById("houseButton");
const countHouse = e => {
  if (houseCheck()) {
    const result = diceValues.reduce((acc, cur) => acc + cur);
    potentialScore.innerHTML = result;
  } else {
    potentialScore.innerHTML = 0;
  }
}
// houseButton.addEventListener("click", countHouse);


//to count for chance button
const chanceButton = document.getElementById("chanceButton");
const countChance = e => {
  const result = diceValues.reduce((acc, cur) => acc + cur);
  potentialScore.innerHTML = result;
}
// chanceButton.addEventListener("click", countChance);

//to count points if yatzy / all five dice show the same amount of eyes
const yatzyButton = document.getElementById("yatzyButton");
const countYatzy = e => {
  for (let i = 1; i < 6; i++) {
    const isYatzy = diceValues.every(dice => dice === i);
    if (isYatzy) {
      potentialScore.innerHTML = 5 * i;
    } else {
      potentialScore.innerHTML = 0;
    }
  };
}
// yatzyButton.addEventListener("click", countYatzy);





// Variables
export { rollButton, diceContainer, options, collectContainer, pairContainer, ofKindContainer, houseButton, chanceButton, yatzyButton }
//Functions
export { rollDice, keepDice, chosenOption, countEyes, countPairEyes, countOfKind, countHouse, countChance, countYatzy }

//
