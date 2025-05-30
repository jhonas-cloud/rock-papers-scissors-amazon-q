import './style.css';

// Define the possible choices
type Choice = 'rock' | 'paper' | 'scissors';
type GameResult = 'win' | 'lose' | 'draw';

// Game state
let playerScore = 0;
let computerScore = 0;
let playerChoice: Choice | null = null;
let computerChoice: Choice | null = null;

// DOM Elements
const app = document.querySelector<HTMLDivElement>('#app')!;

// Initialize the game
function initGame() {
  app.innerHTML = `
    <div class="game-container">
      <h1>Rock Paper Scissors</h1>
      
      <div class="score">
        <div class="score-box">
          <div>Player</div>
          <div id="player-score">${playerScore}</div>
        </div>
        <div class="score-box">
          <div>Computer</div>
          <div id="computer-score">${computerScore}</div>
        </div>
      </div>
      
      <div class="battle">
        <div class="player-choice">
          <div>Your Choice</div>
          <div id="player-choice-display" class="choice"></div>
        </div>
        
        <div class="vs">VS</div>
        
        <div class="computer-choice">
          <div>Computer's Choice</div>
          <div id="computer-choice-display" class="choice"></div>
        </div>
      </div>
      
      <div class="result" id="result"></div>
      
      <div>
        <h3 class="choices-title">Make your choice:</h3>
        <div class="choices">
          <div class="choice rock" id="rock">
            <img src="/images/rock.svg" alt="Rock">
          </div>
          <div class="choice paper" id="paper">
            <img src="/images/paper.svg" alt="Paper">
          </div>
          <div class="choice scissors" id="scissors">
            <img src="/images/scissors.svg" alt="Scissors">
          </div>
        </div>
      </div>
      
      <button class="reset-btn" id="reset">Reset Game</button>
    </div>
  `;

  // Create images directory and SVG files
  createImagesDirectory();

  // Add event listeners
  document.getElementById('rock')?.addEventListener('click', () => playGame('rock'));
  document.getElementById('paper')?.addEventListener('click', () => playGame('paper'));
  document.getElementById('scissors')?.addEventListener('click', () => playGame('scissors'));
  document.getElementById('reset')?.addEventListener('click', resetGame);
}

// Create computer choice
function getComputerChoice(): Choice {
  const choices: Choice[] = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Determine the winner
function determineWinner(player: Choice, computer: Choice): GameResult {
  if (player === computer) return 'draw';
  
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'win';
  }
  
  return 'lose';
}

// Play the game
function playGame(choice: Choice) {
  playerChoice = choice;
  computerChoice = getComputerChoice();
  
  const result = determineWinner(playerChoice, computerChoice);
  
  // Update scores
  if (result === 'win') {
    playerScore++;
  } else if (result === 'lose') {
    computerScore++;
  }
  
  // Update UI
  updateUI(result);
}

// Update the UI
function updateUI(result: GameResult) {
  const playerScoreElement = document.getElementById('player-score');
  const computerScoreElement = document.getElementById('computer-score');
  const resultElement = document.getElementById('result');
  const playerChoiceDisplay = document.getElementById('player-choice-display');
  const computerChoiceDisplay = document.getElementById('computer-choice-display');
  
  if (playerScoreElement) playerScoreElement.textContent = playerScore.toString();
  if (computerScoreElement) computerScoreElement.textContent = computerScore.toString();
  
  if (resultElement) {
    if (result === 'win') {
      resultElement.textContent = 'You win!';
      resultElement.style.color = '#2ecc71';
    } else if (result === 'lose') {
      resultElement.textContent = 'You lose!';
      resultElement.style.color = '#e74c3c';
    } else {
      resultElement.textContent = 'It\'s a draw!';
      resultElement.style.color = '#f39c12';
    }
  }
  
  // Display choices
  if (playerChoiceDisplay && playerChoice) {
    playerChoiceDisplay.innerHTML = `<img src="/images/${playerChoice}.svg" alt="${playerChoice}">`;
    playerChoiceDisplay.className = `choice ${playerChoice}`;
  }
  
  if (computerChoiceDisplay && computerChoice) {
    computerChoiceDisplay.innerHTML = `<img src="/images/${computerChoice}.svg" alt="${computerChoice}">`;
    computerChoiceDisplay.className = `choice ${computerChoice}`;
  }
}

// Reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerChoice = null;
  computerChoice = null;
  
  const playerScoreElement = document.getElementById('player-score');
  const computerScoreElement = document.getElementById('computer-score');
  const resultElement = document.getElementById('result');
  const playerChoiceDisplay = document.getElementById('player-choice-display');
  const computerChoiceDisplay = document.getElementById('computer-choice-display');
  
  if (playerScoreElement) playerScoreElement.textContent = '0';
  if (computerScoreElement) computerScoreElement.textContent = '0';
  if (resultElement) resultElement.textContent = '';
  
  if (playerChoiceDisplay) {
    playerChoiceDisplay.innerHTML = '';
    playerChoiceDisplay.className = 'choice';
  }
  
  if (computerChoiceDisplay) {
    computerChoiceDisplay.innerHTML = '';
    computerChoiceDisplay.className = 'choice';
  }
}

// Create images directory and SVG files
function createImagesDirectory() {
  // This function is just a placeholder since we can't directly create files in the browser
  // In a real project, you would create these files manually or use a build process
  console.log('Remember to create the images directory with rock.svg, paper.svg, and scissors.svg files');
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);

// Initialize the game
initGame();
