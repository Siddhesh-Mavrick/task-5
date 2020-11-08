// variable that switches players turn
let switchPlayer = true;
//check variable for a tie.
let tieCheck = false;
//reference to board element in the DOM
const board = document.getElementsByClassName('board')[0];
//reference to header that indicates who's the next player.
const next = document.getElementById('player-msg');
// 2d array that stores the current board's X and O values.
let pos = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
//store the winner's cells.
let winnerPos = [];

/*
* Draw the cell with either an X or an O.
* If the cell is filled already, then do nothing.
*/
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
/*
* Executes a full check on the game board.
* Returns true in case of a tie or a win, false otherwise.
*/
function checkGameState() {
  //check if tie
  if (tieCheck >= 9) {
    next.textContent = 'Tie!!!';
    return true;
  }
  //check vertical cells for a winner
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

  //check horizontal cells for a winner
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

  //check diagonal cells for a winner
  let topLeft = pos[0][0];
  let topRight = pos[0][2];
  let center = pos[1][1];
  let bottomLeft = pos[2][0];
  let bottomRight = pos[2][2];
  // top left to bottom right
  if (center != 0 && center == topLeft && center == bottomRight) {
    if (center == 1) next.textContent = "Player 1 wins";
    else if (center == 2) next.textContent = "Player 2 wins";
    colorWinner(0, 0, 1, 1, 2, 2);
    return true;
  }
  //bottom left to top right
  if (center != 0 && center == bottomLeft && center == topRight) {
    if (center == 1) next.textContent = "Player 1 wins";
    else if (center == 2) next.textContent = "Player 2 wins";
    colorWinner(2, 0, 1, 1, 0, 2);
    return true;
  }
  return false;
}

//Colors winner's cells(3).
function colorWinner(row1, col1, row2, col2, row3, col3) {
  colorCell(row1, col1);
  colorCell(row2, col2);
  colorCell(row3, col3);
}

//Color a cell at pos[row,col] of the board (table).
function colorCell(row, col) {
  let c = board.getElementsByTagName('tr')[row].children[col];
  c.style.backgroundColor = '#C5D86D';
}

//Function expression for when a cell is clicked.
const cellClick = function(e) {
  draw(e);
};

//Stops the game rendering the table cells unclickable.
function end() {
  next.style.color = '#D7263D';
  board.removeEventListener('click', cellClick, false);
}

//Resets the whole board and variables to their initial states.
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
  //location.reload();
  clearBoard();
}, false);

board.addEventListener('click', cellClick, false);
