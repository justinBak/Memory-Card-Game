// const BOARD_WIDTH = 4;
// const BOARD_HEIGHT = 3;
// let board = [];

// for(let rowIndex = 0; rowIndex < BOARD_HEIGHT; ++rowIndex){
//     board.push([]);
//     for(let colIndex = 0; colIndex< BOARD_WIDTH; ++colIndex){
//         board[rowIndex].push({value: null, faceDown: true});
//     }
// }
// console.log(board);

// const NUM_ITEMS = BOARD_WIDTH * BOARD_HEIGHT /2;

// for(let item = 0; item< NUM_ITEMS; ++item){
//     for(let pairIndex = 0; pairIndex < 2; ++pairIndex){
//         while(true){
//             let row = Math.floor(Math.random()*BOARD_HEIGHT);
//             let col = Math.floor(Math.random()*BOARD_WIDTH);  
//             if(board[row][col].value === null){
//                 board[row][col].value = item;
//                 break;
//             }
//         }
//     }
// }
// console.log(board);

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;



function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

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

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));