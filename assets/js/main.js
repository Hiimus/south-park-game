$(document).ready(function(){
        $("#exampleModal").modal('show');
	});

const cards = document.querySelectorAll('.game-card');
const cardsMd = document.querySelectorAll('.game-card, .game-card-md');



let lock = false;
let firstSign, secondSign;
let hasFlipped = false;

let hasClickedEasy = false;


let int = document.getElementById('flips');
let integer = 0;

let easy = document.getElementById('easy');
let medium = document.getElementById('medium');
let startGame = document.getElementById('start-game');

easy.addEventListener('click', function easy() {
    
    console.log('You selected easy');
    cards.forEach(sign => sign.style.display = 'block');

})

medium.addEventListener('click', function medium() {
    $("#exampleModal").modal('hide');
    console.log('You selected medium');
    cards.forEach(sign => sign.classList.remove = 'game-card');
    cardsMd.forEach(sign => sign.setAttribute('style', 'display: block; width: calc(16.666% - 8px); height: calc(33.333% - 8px); position: relative; margin: 4px; transform: scale(1); transform-style: preserve-3d; transition: all 0.4s ease; background-color: rgba(230, 243, 223, 0.5); border-radius: 5%;'));
})
    

startGame.addEventListener('click', function startGame() {
    $("#exampleModal").modal('hide');
})






function cardFlip() {

    integer += 1;
    if (lock) return;
    if (this === firstSign) return;

    this.classList.add('cardFlipped');

    int.innerHTML = 'Flips: ' + integer;

    // first click
    if (!hasFlipped) {
        hasFlipped = true;
        firstSign = this;
        
    // second click    
    } else {
        
        secondSign = this;

        if (firstSign.dataset.name === secondSign.dataset.name) {
            //It's a match
            firstSign.removeEventListener('click', cardFlip);
            secondSign.removeEventListener('click', cardFlip);
            setTimeout(function () {
                firstSign.style.transform = "rotateY(180deg)";
                secondSign.style.transform = "rotateY(180deg)";
            }, 300);

            reset();
            
        } else {
          // Not a match  
          lock = true;
          setTimeout(function() {
            firstSign.classList.remove('cardFlipped');
            secondSign.classList.remove('cardFlipped');
            
            reset();
          }, 1000);
            
        }    
    }
}


function cardFlipMd() {

    integer += 1;
    if (lock) return;
    if (this === firstSign) return;

    this.classList.add('cardFlipped');

    int.innerHTML = 'Flips: ' + integer;

    // first click
    if (!hasFlipped) {
        hasFlipped = true;
        firstSign = this;
        
    // second click    
    } else {
        
        secondSign = this;

        if (firstSign.dataset.name === secondSign.dataset.name) {
            //It's a match
            firstSign.removeEventListener('click', cardFlipMd);
            secondSign.removeEventListener('click', cardFlipMd);
            setTimeout(function () {
                firstSign.style.transform = "rotateY(180deg)";
                secondSign.style.transform = "rotateY(180deg)";
            }, 300);

            reset();
            
        } else {
          // Not a match  
          lock = true;
          setTimeout(function() {
            firstSign.classList.remove('cardFlipped');
            secondSign.classList.remove('cardFlipped');
            
            reset();
          }, 1000);
            
        }    
    }
}




(function shuffleCards() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

function reset() {
    [hasFlipped, lock] = [false, false];
    [firstSign, secondSign] = [null, null];
}



cards.forEach(board => board.addEventListener('click', cardFlip));
cardsMd.forEach(boardMd => boardMd.addEventListener('click', cardFlipMd));








