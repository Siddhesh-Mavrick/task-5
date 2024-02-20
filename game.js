let switchPlayer = true;
let tieCheck = false;
const board = document.getElementsByClassName('board')[0];
const next = document.getElementById('player-msg');
let pos = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
let winnerPos = [];

function draw(e) {
  let cell = e.target;
  if (cell.textContent == "") {
    tieCheck++;
    if (switchPlayer) { //X turn.
      cell.textContent = "X";
      cell.style.color = "#F46036";
      pos[cell.parentNode.rowIndex][cell.cellIndex] = 1;
      next.textContent = "Player 2 turn";
      next.style.color = "#2E294E";
    } else { // O Turn.
      cell.textContent = "O";
      cell.style.color = "#2E294E";
      pos[cell.parentNode.rowIndex][cell.cellIndex] = 2;
      next.textContent = "Player 1 turn";
      next.style.color = "#F46036";
    }
    if (checkGameState()) end();
    switchPlayer = !switchPlayer;
  }
}

function checkGameState() {
  if (tieCheck >= 9) {
    next.textContent = 'Tie!!!';
    return true;
  }
  for (let col = 0; col < 3; col++) {
    let first = pos[0][col];
    let second = pos[1][col];
    let third = pos[2][col];
    if (first != 0 && first == second && second == third) {
      if (first == 1) next.textContent = "Player 1 wins";
      else if (first == 2) next.textContent = "Player 2 wins";
      colorWinner(0, col, 1, col, 2, col);
      return true;
    }
  }

  for (let row = 0; row < 3; row++) {
    let first = pos[row][0];
    let second = pos[row][1];
    let third = pos[row][2];
    if (first != 0 && first == second && second == third) {
      if (first == 1) next.textContent = "Player 1 wins";
      else if (first == 2) next.textContent = "Player 2 wins";
      colorWinner(row, 0, row, 1, row, 2);
      return true;
    }
  }

  let topLeft = pos[0][0];
  let topRight = pos[0][2];
  let center = pos[1][1];
  let bottomLeft = pos[2][0];
  let bottomRight = pos[2][2];
  if (center != 0 && center == topLeft && center == bottomRight) {
    if (center == 1) next.textContent = "Player 1 wins";
    else if (center == 2) next.textContent = "Player 2 wins";
    colorWinner(0, 0, 1, 1, 2, 2);
    return true;
  }
  if (center != 0 && center == bottomLeft && center == topRight) {
    if (center == 1) next.textContent = "Player 1 wins";
    else if (center == 2) next.textContent = "Player 2 wins";
    colorWinner(2, 0, 1, 1, 0, 2);
    return true;
  }
  return false;
}

function colorWinner(row1, col1, row2, col2, row3, col3) {
  colorCell(row1, col1);
  colorCell(row2, col2);
  colorCell(row3, col3);
}

function colorCell(row, col) {
  let c = board.getElementsByTagName('tr')[row].children[col];
  c.style.backgroundColor = '#C5D86D';
}

const cellClick = function(e) {
  draw(e);
};

function end() {
  next.style.color = '#D7263D';
  board.removeEventListener('click', cellClick, false);
}

function clearBoard() {
  let cells = document.querySelectorAll('td');
  for (let i = 0; i < 9; i++) {
    cells[i].textContent = "";
    cells[i].style.backgroundColor = "#EAEAEA";
  }
  switchPlayer = true;
  tieCheck = false;
  pos = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  winnerPos = [];
  next.textContent = "Player 1 turn";
  next.style.color = "#F46036";
  board.addEventListener('click', cellClick, false);
}

document.getElementById('btn').addEventListener('click', function() {
  clearBoard();
}, false);

board.addEventListener('click', cellClick, false);
