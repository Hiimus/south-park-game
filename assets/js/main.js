$(document).ready(function () {
    cards.forEach(sign => sign.style.display = 'block');
    $("#exampleModal").modal('show');
});

const cards = document.querySelectorAll('.game-card');
let lock = false;
let firstSign, secondSign;
let hasFlipped = false;
let int = document.getElementById('flips');
let integer = 0;
let selectMedium = document.querySelectorAll('.game-card-md');
let easy = document.getElementById('easy');
let medium = document.getElementById('medium');
let startGame = document.getElementById('start-game');
let mediumId = document.querySelectorAll('#md');

let hardId = document.querySelectorAll('#hd');

easy.addEventListener('click', easyMode);

function easyMode() {
    console.log('You selected easy');
    toggleMd();
    toggleHd();
    selectedEasy();
    shuffleCardsEs();
}

medium.addEventListener('click', mediumMode);

function mediumMode() {
    console.log('You selected medium');
    toggleHd();
    selectedMedium();
    shuffleCardsMd();
}

hard.addEventListener('click', hardMode);

function hardMode() {
    console.log('You selected hard');
    selectedHard();
    shuffleCardsHd()
}

startGame.addEventListener('click', startingGame);

function startingGame() {
    $("#exampleModal").modal('hide');
}

function toggleMd() {
    //mediumId.forEach(sign => sign.remove());
    selectMedium.forEach(sign => sign.classList.toggle('game-card-md'));
}

function toggleHd() {
    selectMedium.forEach(sign => sign.classList.toggle('game-card-md', 'game-card-hd'));
}

function selectedEasy() {
    cards.forEach(sign => sign.setAttribute('style', 'width: calc(25% - 8px); height: calc(33.333% - 8px);'));
}

function selectedMedium() {
    cards.forEach(sign => sign.setAttribute('style', 'width: calc(16.666% - 8px); height: calc(33.333% - 8px'));
}

function selectedHard() {
    cards.forEach(sign => sign.setAttribute('style', 'display: block; width: calc(16.666% - 8px); height: calc(25% - 8px); padding: 15px'));
}

function shuffleCardsEs() {
    cards.forEach(sign => {
    let randomPositions = Math.floor(Math.random() * 12);
    sign.style.order = randomPositions;
    });
};

function shuffleCardsMd() {
    cards.forEach(sign => {
    let randomPositions = Math.floor(Math.random() * 18);
    sign.style.order = randomPositions;
    });
}

function shuffleCardsHd() {
    cards.forEach(sign => {
    let randomPositions = Math.floor(Math.random() * 24);
    sign.style.order = randomPositions;
    });
}



cards.forEach(board => board.addEventListener('click', cardFlip));

function cardFlip() {
    if (lock === true) return;
    
    if (this === firstSign) return;
    
    
    integer += 1;
    this.classList.add('cardFlipped');
    int.innerHTML = 'Flips: ' + integer;
    if (!hasFlipped) {
        // first click
        hasFlipped = true;
        firstSign = this;
        return;
    }
    // second click 
    secondSign = this;
    checkMatching();
}

function checkMatching() {
    if (firstSign.dataset.name === secondSign.dataset.name) {
        //It's a match
        firstSign.style.transform = "rotateY(180deg)";
        setTimeout(function () {
            secondSign.style.transform = "rotateY(180deg)";
        }, 300);
        setTimeout(function () {
            disableFlip();
        }, 499); 
    } else {
        // Not a match  
        notMatching();
    }
}

function disableFlip() {
    firstSign.removeEventListener('click', cardFlip);
    secondSign.removeEventListener('click', cardFlip);
    reset();
}

function notMatching() {
    lock = true;
    setTimeout(function () {
        firstSign.classList.remove('cardFlipped');
        secondSign.classList.remove('cardFlipped');
        reset();
    }, 1000);
}

(function shuffleCards() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

function reset() {
    hasFlipped = false;
    lock = false;
    firstSign = null;
    secondSign = null;
}


