const human_score = document.getElementById("humanScore");
const computer_score = document.getElementById("computerScore");
const buttons = document.querySelectorAll(".btn");
const human_board = document.querySelector(".human");
const computer_board = document.querySelector(".computer");
const result = document.querySelector(".result");
const reset = document.querySelector(".reset");

// choice array
const choice = ["rock", "paper", "scissors"];

// scores
let humanScore = 0;
let computerScore = 0;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // get and set human choice
    const humanChoice = button.getAttribute("name");
    human_board.textContent = humanChoice;

    // get and set computer choice
    const computerChoice = getComputerChoice();
    computer_board.textContent = computerChoice;

    playRound(humanChoice, computerChoice);

    human_score.textContent = humanScore;
    computer_score.textContent = computerScore;

    // check for winner
    if (humanScore === 5 || computerScore === 5) {
      if (humanScore === 5) {
        result.textContent = "You Win";
      } else if (computerScore === 5) {
        result.textContent = "You Lose";
      } else if (humanScore === 5 && computerScore === 5) {
        result.textContent = "It's a tie";
      }

      buttons.forEach((button) => {
        button.disabled = true;
      });
    }
  });
});

function getComputerChoice() {
  const option = choice[Math.floor(Math.random() * choice.length)];
  console.log(`The computer chose ${option}`);
  return option;
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log("It's a tie");
    humanScore += 1;
    computerScore += 1;
  } else if (humanChoice === "rock" && computerChoice === "scissors") {
    console.log(`You win the round ${humanChoice} beats ${computerChoice}`);
    humanScore += 1;
  } else if (humanChoice === "paper" && computerChoice === "rock") {
    console.log(`You win the round ${humanChoice} beats ${computerChoice}`);
    humanScore += 1;
  } else if (humanChoice === "scissors" && computerChoice === "paper") {
    console.log(`You win the round ${humanChoice} beats ${computerChoice}`);
    humanScore += 1;
  } else if (humanChoice === "rock" && computerChoice === "paper") {
    console.log(`You Lose! the round ${computerChoice} beats ${humanChoice}`);
    computerScore += 1;
  } else if (humanChoice === "paper" && computerChoice === "scissors") {
    console.log(`You Lose! the round ${computerChoice} beats ${humanChoice}`);
    computerScore += 1;
  } else if (humanChoice === "scissors" && computerChoice === "rock") {
    console.log(`You Lose! the round ${computerChoice} beats ${humanChoice}`);
    computerScore += 1;
  }
}

reset.addEventListener("click", () => {
  humanScore = 0;
  computerScore = 0;
  human_score.textContent = humanScore;
  computer_score.textContent = computerScore;
  human_board.textContent = "";
  computer_board.textContent = "";
  result.textContent = "";
  buttons.forEach((button) => {
    button.disabled = false;
  });
});
