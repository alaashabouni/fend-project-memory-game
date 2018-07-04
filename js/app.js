/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Global scope variables
const deck = document.querySelector('.deck');
let toggledCards = [];
let moves = 0;
let clockOff = true
let time = 0;
let clockId;
let matched = 0;
const totalPairs = 8;

// event listener if card is clicked
deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)) {
    if (clockOff) {
      timerStart();
      clockOff = false;
    }
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if  (toggledCards.length === 2) {
      checkMatch(clickTarget);
      countMoves();
      countStars();
    }
  }
});

function isClickValid(clickTarget) {
  return (
    clickTarget.classList.contains('card')
    && !clickTarget.classList.contains('match')
    && toggledCards.length < 2
    && !toggledCards.includes(clickTarget)
  );
}

//Turn over card
function toggleCard(clickTarget) {
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
}

//Add turned over cards to array
function addToggleCard(clickTarget) {
  toggledCards.push(clickTarget);
  console.log(toggledCards);
}

//Check if cards match
function checkMatch() {
  const TOTAL_PAIRS = 8;
  if (
    toggledCards[0].firstElementChild.className ===
    toggledCards[1].firstElementChild.className
  ){
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    toggledCards = [];
    matched++;
  } else {
    setTimeout(() =>{
    toggleCard(toggledCards[0]);
    toggleCard(toggledCards[1]);
    toggledCards = [];
  }, 1000);
}
if (matched === totalPairs){
  gameOver();
}
}

//Shuffle cards in the deck each time
function deckShuffle () {
  const shuffleTheseCards = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(shuffleTheseCards);
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
}
deckShuffle();

//Count moves made
function countMoves() {
  moves++;
  const moveText = document.querySelector('.moves');
  moveText.innerHTML = moves;
}

//Star Count based on moves
function countStars(){
  if (moves === 17 || moves === 22){
   removeStar();}
}

function removeStar(){
  const starList = document.querySelectorAll('.stars li');
  for (star of starList){
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
}

//Game timer
function timerStart() {
  clockId = setInterval(() => {
    time++;
    showTime();
    console.log(time);
  }, 1000);
}

function showTime() {
  const minutes = Math.floor(time/60);
  const seconds = time % 60;
  const clock = document.querySelector('.clock');
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML =`${minutes}:${seconds}`;
  }
}

function timerStop() {
  clearInterval(clockId);
}

//END GAME

function togglePopup() {
  const popup = document.querySelector('.popup-background');
  popup.classList.toggle('hide');
}

//Display star count in popup
function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  console.log(starCount);
  return starCount;
}

//Show game Stats when popup is called
function writePopupStats() {
  const timeStat = document.querySelector('.popup-time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesStat = document.querySelector('.popup-moves');
  const starsStat = document.querySelector('.popup-stars');
  const stars = getStars();

  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML = `Moves = ${moves}`;
  starsStat.innerHTML = `Stars = ${stars}`;
}

//Game Over and reset
function resetGame() {
  resetClockAndTime();
  resetMoves();
  resetStars();
  deckShuffle();
}

function resetClockAndTime() {
  timerStop();
  clockOff = true;
  time = 0;
  showTime();
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}


//Close popup when Cancel button clicked
document.querySelector('.popup-cancel').addEventListener('click', () => {
  togglePopup();
})

//Reset game when replay button clicked
document.querySelector('.popup-replay').addEventListener('click', resetGame);

//Reset game when restart icon clicked
document.querySelector('.restart').addEventListener('click', resetGame);

//Game over

function gameOver() {
    timerStop();
    writePopupStats();
    togglePopup();
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
