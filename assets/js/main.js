const cards = document.querySelectorAll('.game-card');

let firstSign, secondSign;
let hasFlipped = false;


function cardFlip() {
    this.classList.add('cardFlipped');

    // first click
    if (!hasFlipped) {
        hasFlipped = true;
        firstSign = this;
    // second click    
    } else {
        hasFlipped = false;
        secondSign = this;

        if (firstSign.dataset.name === secondSign.dataset.name) {
            //It's a match
            
            firstSign.removeEventListener('click', cardFlip);
            secondSign.removeEventListener('click', cardFlip);
            setTimeout(function () {
                firstSign.style.transform = "rotateY(180deg)";
                secondSign.style.transform = "rotateY(180deg)";
            }, 300);
            
        } else {
          setTimeout(function() {
            firstSign.classList.remove('cardFlipped');
            secondSign.classList.remove('cardFlipped');
          }, 1000);
            
        }    
    }
}




cards.forEach(board => board.addEventListener('click', cardFlip));







