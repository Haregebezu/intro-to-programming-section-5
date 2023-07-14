const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('num-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  let guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;
  console.log(`Guess: ${guess}`);

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.textContent = `You made ${attempts} guesses`;

    correctMessage.style.display = 'block';
    correctMessage.textContent = 'Guessed correctly';

    submitButton.disabled = true;
    guessInput.disabled = true;
    resetButton.disabled = false; // Enable the reset button
  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = 'block';
    } else {
      tooHighMessage.style.display = 'block';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.textContent = `You guessed ${guess}. ${remainingAttempts} ${remainingAttempts === 1 ? 'guess' : 'guesses'} remaining`;
  }

  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    resetButton.disabled = false; // Enable the reset button
    maxGuessesMessage.style.display = 'block';
    resetButton.style.display = ''; // Show the reset button
  } 

  guessInput.value = '';
  
}

function hideAllMessages() {
tooHighMessage.style.display = 'none';
tooLowMessage.style.display = 'none';
maxGuessesMessage.style.display = 'none';
correctMessage.style.display = 'none';
numberOfGuessesMessage.style.display = 'none';
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabeld = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
  resetButton.disabled = true; // Disable the reset button initially

  submitButton.disabled = false; // Enable the submit butt
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);
setup();
