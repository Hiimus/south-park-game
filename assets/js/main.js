$(document).ready(function(){
        $("#exampleModal").modal('show');
	});

const cards = document.querySelectorAll('.game-card');
var cardsTimer = document.querySelectorAll('.game-card');

let lock = false;
let firstSign, secondSign;
let hasFlipped = false;
let startTimer = false;


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
    [firstSign, secondSign] = [null, null];
}



cards.forEach(board => board.addEventListener('click', cardFlip));
cardsTimer.forEach(sign => sign.addEventListener('click', countDown));


// Thirty second countdown.
function countDown() {

    startTimer = true;
    
    var countDown = new Date().getTime() + 32000;
         //  Update the count down every 1 second
    var x = setInterval(function() {

        //  Get today's date and time
        var now = new Date().getTime();
            
        //  Find the distance between now and the count down date
        var distance = countDown - now;
            
        //  Time calculations for seconds
        
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        //  Output the result in the div in the index.html
        if (startTimer === true) {
            document.getElementById("timer").innerHTML = "Timer: " + seconds + "s ";
            cardsTimer.removeEventListener('click', countDown);
        }
        
            
        //  If the count down is over, write Game Over
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "Game Over";
        }
    }, 1000);
}
