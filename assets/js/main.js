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

let easy = document.getElementById('easy');
let medium = document.getElementById('medium');
let startGame = document.getElementById('start-game');


let mediumId = document.querySelectorAll('#md');
let hardId = document.querySelectorAll('#hd');

easy.addEventListener('click', function easy() {
    console.log('You selected easy');
    rmIdMd();
    rmIdHd();
    selectedEasy();
    shuffleCardsEs();
});

function rmIdMd() {
    mediumId.forEach(sign => sign.remove());
}

function rmIdHd() {
    hardId.forEach(sign => sign.remove());
}

function selectedEasy() {
    cards.forEach(sign => sign.setAttribute('style', 'width: calc(25% - 8px); height: calc(33.333% - 8px);'));
}

function shuffleCardsEs() {
    cards.forEach(sign => {
    let randomPositions = Math.floor(Math.random() * 12);
    sign.style.order = randomPositions;
    });
};



medium.addEventListener('click', function medium() {
    console.log('You selected medium');
    var addMedium = document.querySelectorAll('.game-card-md');
    addMedium.forEach(sign => sign.setAttribute('id', 'md'));
    var hard = document.querySelectorAll('#hd');
    hard.forEach(sign => sign.remove());
    var addNewWidth = document.querySelectorAll('.game-card');
    addNewWidth.forEach(sign => sign.setAttribute('style', 'width: calc(16.666% - 8px); height: calc(33.333% - 8px'));
});



hard.addEventListener('click', function hard() {
    console.log('You selected hard');
    
    cards.forEach(sign => sign.setAttribute('style', 'width: calc(16.666% - 8px); height: calc(25% - 8px); padding: 15px'));
});


startGame.addEventListener('click', function startGame() {
    $("#exampleModal").modal('hide');
});






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
        disableFlip();
        setTimeout(function () {
            firstSign.style.transform = "rotateY(180deg)";
            secondSign.style.transform = "rotateY(180deg)";
        }, 300);



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

// function cardFlipMd() {

//     integer += 1;
//     if (lock) return;
//     if (this === firstSign) return;

//     this.classList.add('cardFlipped');

//     int.innerHTML = 'Flips: ' + integer;

//     // first click
//     if (!hasFlipped) {
//         hasFlipped = true;
//         firstSign = this;

//         // second click    
//     } else {

//         secondSign = this;

//         if (firstSign.dataset.name === secondSign.dataset.name) {
//             //It's a match
//             firstSign.removeEventListener('click', cardFlipMd);
//             secondSign.removeEventListener('click', cardFlipMd);
//             setTimeout(function () {
//                 firstSign.style.transform = "rotateY(180deg)";
//                 secondSign.style.transform = "rotateY(180deg)";
//             }, 300);

//             reset();

//         } else {
//             // Not a match  
//             lock = true;
//             setTimeout(function () {
//                 firstSign.classList.remove('cardFlipped');
//                 secondSign.classList.remove('cardFlipped');

//                 reset();
//             }, 1000);

//         }
//     }
// }




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



cards.forEach(board => board.addEventListener('click', cardFlip));
