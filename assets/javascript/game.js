const cards = document.querySelectorAll('.memory-card');
const btn = document.querySelector('button');
const div = document.createElement('div');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


/* Flip card function */
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add('flip');
    
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this; // <--- inside the if statement "this" represents the first card clicked
        return;
    }
    
    secondCard = this; // <--- "this" represents the second card that was clicked
    lockBoard = true; // Prevents any card flipping before the cards are hidden or match
    
    checkForMatch();
}

// Use data attribute to check for matching pairs
function checkForMatch(){
    let isMatch = firstCard.dataset.card === secondCard.dataset.card; 
    isMatch ? disableCards() : unflipCards(); // <--- Executes if the condition returns true
}

// Disables cards after a card match
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
}

function unflipCards(){
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1500);
}

// Resets the first and second card variables after each round
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// This Function uses the forEach method to shuffle each card randomly
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}
shuffle();

// Resets the board, shuffle function, and each card to their original state
function resetGame (){
    cards.forEach((card) => card.classList.remove('flip'));
    shuffle();
    resetBoard();
}

function timer(){
    
}

btn.addEventListener('click', resetGame);
cards.forEach(card => card.addEventListener('click', flipCard));