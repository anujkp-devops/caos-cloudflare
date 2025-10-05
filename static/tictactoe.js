const boardEl = document.getElementById("board");
const statusEl = document.getElementById("tictactoe-status");
const resetButton = document.getElementById("reset");

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = new Array(9).fill(null);
let active = true;

const renderBoard = () => {
  boardEl.innerHTML = "";
  board.forEach((value, index) => {
    const button = document.createElement("button");
    button.textContent = value || "";
    button.style.fontSize = "2rem";
    button.style.height = "100px";
    button.style.border = "1px solid #fff";
    button.style.background = "#111";
    button.style.color = value === "X" ? "#0ff" : "#ff0";
    button.disabled = Boolean(value) || !active;
    button.addEventListener("click", () => handlePlayerMove(index));
    boardEl.appendChild(button);
  });
};

const checkWinner = (symbol) => {
  return lines.some((line) => line.every((idx) => board[idx] === symbol));
};

const emptySquares = () => board.reduce((acc, val, idx) => {
  if (!val) acc.push(idx);
  return acc;
}, []);

const endGame = (message) => {
  active = false;
  statusEl.textContent = message;
  renderBoard();
  let popup = document.getElementById("popup");
  let icon = document.getElementById("popup-icon");
  let text = document.getElementById("popup-text");
  if (!popup || !icon || !text) return;
  popup.style.display = "flex";
  if (message.includes("Computer achieved triple O")) {
    icon.innerHTML = "👑";
    text.textContent = "You won! Play again or go home.";
  } else if (message.includes("You got three in a row")) {
    icon.innerHTML = "👎";
    text.textContent = "You lose!";
  } else {
    icon.innerHTML = "🤷";
    text.textContent = message;
  }
};

const computerMove = () => {
  const free = emptySquares();
  if (!free.length) {
    endGame("Stalemate. Neither chaos nor order prevailed.");
    return;
  }

  const findWinningIndex = (symbol) => {
    for (const line of lines) {
      const values = line.map((idx) => board[idx]);
      const empties = line.filter((idx) => !board[idx]);
      if (empties.length === 1 && values.filter((val) => val === symbol).length === 2) {
        return empties[0];
      }
    }
    return null;
  };

  let move = findWinningIndex("O");
  if (move === null) {
    move = findWinningIndex("X");
  }
  if (move === null) {
    move = free[Math.floor(Math.random() * free.length)];
  }

  board[move] = "O";
  renderBoard();

  if (checkWinner("O")) {
    endGame("Computer achieved triple O. You masterfully lose and therefore win!");
    return;
  }

  if (!emptySquares().length) {
    endGame("No one won. Call that a draw in the war on competence.");
  }
};

const handlePlayerMove = (index) => {
  if (!active || board[index]) return;
  board[index] = "X";
  renderBoard();

  if (checkWinner("X")) {
    endGame("You got three in a row. Immediate failure.");
    return;
  }

  computerMove();
};

resetButton.addEventListener("click", () => {
  board = new Array(9).fill(null);
  active = true;
  statusEl.textContent = "You are X. Computer is O. Try not to win.";
  renderBoard();
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "none";
});

renderBoard();
