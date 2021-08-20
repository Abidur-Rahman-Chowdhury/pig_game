'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const currentPlayer0 = document.getElementById('current--0');
const currentPlayer1 = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');

let scores, currentScore, activePlayer, playing;

const init = function () {
    activePlayer = 0;
    playing = true;
    currentScore = 0;
    scores = [0, 0];
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentPlayer1.textContent = 0;
    currentPlayer0.textContent = 0;
    diceElement.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();




const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Dice rolling function

rollBtn.addEventListener('click', function () {
  if (playing) {
    // generate random number
    let random = Math.floor(Math.random() * 6 + 1);
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${random}.png`;
    if (random !== 1) {
      currentScore += random;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
holdBtn.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
          scores[activePlayer];
        if (scores[activePlayer] >= 100) {
          playing = false;
          document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
          document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--active');
        } else {
          switchPlayer();
        }
    }
 
});

newGame.addEventListener('click', init);
