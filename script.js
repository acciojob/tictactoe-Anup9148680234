//your JS code here. If required.
// Get the necessary DOM elements
const container = document.querySelector('.container');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitButton = document.getElementById('submit');
const board = document.querySelector('.board');
const message = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

// Define the game state variables
let currentPlayer;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

// Hide the game board initially
board.style.display = 'none';

// Add event listeners to the submit button and the cells
submitButton.addEventListener('click', startGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Function to start the game
function startGame() {
  // Get the player names and reset the game board
  const player1 = player1Input.value;
  const player2 = player2Input.value;
  currentPlayer = player1;
  gameBoard = ['', '', '', '', '', '', '', '', ''];

  // Show the game board and update the message
  container.classList.add('game-on');
  board.style.display = 'block';
  message.textContent = `${player1}, you're up!`;

  // Reset the cells
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
}

// Function to handle cell clicks
function handleCellClick(event) {
  // Get the cell index and check if it's empty
  const index = Number(event.target.id) - 1;
  if (gameBoard[index] !== '') return;

  // Update the game board and the cell content
  gameBoard[index] = currentPlayer === player1Input.value ? 'x' : 'o';
  event.target.classList.add(gameBoard[index]);
  event.target.textContent = gameBoard[index];

  // Check if the game is over
  if (checkWin()) {
    message.textContent = `${currentPlayer}, congratulations you won!`;
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
  } else if (checkDraw()) {
    message.textContent = 'It\'s a draw!';
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
  } else {
    // Switch the player and update the message
    currentPlayer = currentPlayer
