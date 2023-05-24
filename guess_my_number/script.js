"user strict";
//function to generate random num between 1 to 20
const randomNum = function () {
  return Math.trunc(Math.random() * 20 + 1);
};
//console.log(randomNum());

//function to display message
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

//function call for winning
function won() {
  displayMessage("🎉 Correct Number!");
  document.querySelector(".number").textContent = secretNumber;
  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector(".number").style.width = "30rem";
}
//global variables
let secretNumber = randomNum();
let score = 20;
let highScore = 0;
let guess = "";

// function for setting hightscore
function setHighScore() {
  if (score > highScore) {
    highScore = score;
    document.querySelector(".highscore").textContent = highScore;
  }
}
// function to check the user guess and decide win or lose

function checkGuess() {
  if (score > 1) {
    displayMessage(guess > secretNumber ? "📈 too High" : "📉 too Low");
    score--;
    document.querySelector(".score").textContent = score;
  } else {
    displayMessage("💣  you lost the game");
    document.querySelector(".score").textContent = 0;
  }
}
// function to playagain, used with click event for again button

function playAgain() {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage("Start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
}

//get the user guessed value
document.querySelector(".check").addEventListener("click", function () {
  guess = Number(document.querySelector(".guess").value);
  //   console.log(guess);
  if (!guess) {
    displayMessage("⛔️ No Number!");
  } else if (guess === secretNumber) {
    won();
    setHighScore();
  } else if (guess !== secretNumber) {
    checkGuess();
  }
});

// handle click event for Again button, event calls playAgain function
document.querySelector(".again").addEventListener("click", playAgain);
