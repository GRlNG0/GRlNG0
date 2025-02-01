// script.js

const board = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const playerPoints = document.getElementById("player-points");
const aiPoints = document.getElementById("ai-points");

let playerScore = 0;
let aiScore = 0;
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let difficulty = "easy";
let gameActive = true;

// Set Difficulty
function setDifficulty(level) {
  difficulty = level;
  message.innerText = `Dificuldade: ${level}`;
}

// Restart Game
function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  message.innerText = "";
  board.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("taken");
  });
}

// Check Winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return gameBoard[a];
    }
  }

  if (!gameBoard.includes("")) return "draw";
  return null;
}

// AI Move (Based on Difficulty)
function aiMove() {
  if (difficulty === "easy") {
    // Random move
    let emptyCells = gameBoard
      .map((val, index) => (val === "" ? index : null))
      .filter((val) => val !== null);
    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameBoard[move] = "O";
    board[move].innerText = "O";
    board[move].classList.add("taken");
  } else if (difficulty === "medium") {
    // Block player or random move
    // Simple strategy to block the player
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === "") {
        gameBoard[i] = "O";
        if (checkWinner() === "O") return;
        gameBoard[i] = "";
      }
    }
    aiMove();
  } else if (difficulty === "hard") {
    // Use Minimax or advanced strategy
    // Placeholder for advanced logic
    aiMove();
  }
}

// Handle Cell Click
board.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.classList.contains("taken") || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add("taken");

    let winner = checkWinner();
    if (winner) {
      gameActive = false;
      if (winner === "X") {
        playerScore++;
        playerPoints.innerText = playerScore;
        message.innerText = "Você venceu!";
      } else if (winner === "O") {
        aiScore++;
        aiPoints.innerText = aiScore;
        message.innerText = "A IA venceu!";
      } else {
        message.innerText = "Empate!";
      }
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (currentPlayer === "O" && gameActive) {
      setTimeout(aiMove, 500);
    }
  });
});
