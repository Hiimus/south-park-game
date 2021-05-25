const cards = document.querySelectorAll('.game-card');

let lock = false;
let firstSign, secondSign;
let hasFlipped = false;


function cardFlip() {
    if (lock) return;
    if (this === firstSign) return;

    this.classList.add('cardFlipped');

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

(function shuffleCards() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

function reset() {
    [hasFlipped, lock] = [false, false];
    [firstSign, secondSign] = [null. null];
}



cards.forEach(board => board.addEventListener('click', cardFlip));







