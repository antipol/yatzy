//import from helpers.js
//Variables
import { rollButton, diceContainer, options, collectContainer, pairContainer, ofKindContainer, houseButton, chanceButton, yatzyButton } from "./helpers.js"
//Functions
import { rollDice, keepDice, chosenOption, countEyes, countPairEyes, countOfKind, countHouse, countChance, countYatzy } from "./helpers.js"

//Import from view.js
//Variables
import { navButton, rulesButton, playerInfoButton, add, sub, nextButton, playButton } from "./view.js"
//Functions
import { toggleNav, toggleRules, togglePlayerInfo, addPlayer, subtractPlayer, next, playerNames } from "./view.js"



//event handlers from helpers.js
rollButton.addEventListener("click", rollDice);
diceContainer.addEventListener("click", keepDice);
options.addEventListener("click", chosenOption);
collectContainer.addEventListener("click", countEyes);
pairContainer.addEventListener("click", countPairEyes);
// ofKindButtons[0].addEventListener("click", count3Same);
// ofKindButtons[1].addEventListener("click", count4Same);
ofKindContainer.addEventListener("click", countOfKind);
houseButton.addEventListener("click", countHouse);
chanceButton.addEventListener("click", countChance);
yatzyButton.addEventListener("click", countYatzy);



//event handlers from view.js
navButton.addEventListener("click", toggleNav);
rulesButton.addEventListener("click", toggleRules);
playerInfoButton.addEventListener("click", togglePlayerInfo);
add.addEventListener("click", addPlayer);
sub.addEventListener("click", subtractPlayer);
nextButton.addEventListener("click", next);
playButton.addEventListener("click", playerNames);
