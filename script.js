'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scoreEL0 = document.getElementById('score--0');
const scoreEL1 = document.getElementById('score--1');
const currentEL0 = document.getElementById('current--0');
const currentEL1 = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

/* The code `btnRoll.addEventListener('click', function () { ... })` is adding an event listener to the
`btnRoll` button. When the button is clicked, the function inside the event listener is executed. */
// Rolling dice functionality
let currentScore, activePlayer, playing, scores;
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreEL0.textContent = 0;
  scoreEL1.textContent = 0;
  currentEL0.textContent = 0;
  currentEL1.textContent = 0;

  diceEL.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
init();
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    //check for roller 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next players
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  //1. Add current score to active player's score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
    } else {
      //3. Switch to next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
