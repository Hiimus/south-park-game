$(document).ready(function () {
    //cards.forEach(sign => sign.style.display = 'block');
    //displayNoneEasy();
    easyMode();
    $("#exampleModal").modal('show');
});



const cards = document.querySelectorAll('.game-card');
const divsArr = Array.from(cards);

let front = document.querySelectorAll(".front-side");
let back = document.querySelectorAll(".back-side");

let easyModus = false;
let mediumModus = false;
let hardModus = false;
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
    checkIfWonEasy();
    toggleMd();
    toggleHd();
    selectedEasy();
    shuffleCardsEs();
    displayNoneEasy();

}

function checkIfWonEasy() {
    easyModus = true;
    mediumModus = false;
    hardModus = false;
}

let cardFlipped = document.querySelectorAll(".cardFlipped");

function displayNoneEasy() {
    divsArr[12].style.display = "none";
    divsArr[13].style.display = "none";
    divsArr[14].style.display = "none";
    divsArr[15].style.display = "none";
    divsArr[16].style.display = "none";
    divsArr[17].style.display = "none";
    divsArr[18].style.display = "none";
    divsArr[19].style.display = "none";
    divsArr[20].style.display = "none";
    divsArr[21].style.display = "none";
    divsArr[22].style.display = "none";
    divsArr[23].style.display = "none";
}

function displayNoneMedium() {
    divsArr[18].style.display = "none";
    divsArr[19].style.display = "none";
    divsArr[20].style.display = "none";
    divsArr[21].style.display = "none";
    divsArr[22].style.display = "none";
    divsArr[23].style.display = "none";
}

medium.addEventListener('click', mediumMode);

function mediumMode() {
    console.log('You selected medium');
    checkIfWonMedium();
    toggleHd();
    selectedMedium();
    shuffleCardsMd();
    displayNoneMedium();
}

function checkIfWonMedium() {
    easyModus = false;
    mediumModus = true;
    hardModus = false;
}

hard.addEventListener('click', hardMode);

function hardMode() {
    console.log('You selected hard');
    checkIfWonHard();
    selectedHard();
    shuffleCardsHd()
}

function checkIfWonHard() {
    easyModus = false;
    mediumModus = false;
    hardModus = true;
}

startGame.addEventListener('click', startingGame);

function startingGame() {
    $("#exampleModal").modal('hide');
}

function toggleMd() {

    selectMedium.forEach(sign => sign.classList.toggle('game-card-md'));
}

function toggleHd() {
    selectMedium.forEach(sign => sign.classList.toggle('game-card-md', 'game-card-hd'));
}

let restart = document.getElementById("restart");
let restartIcon = document.getElementById("restart-icon");

function restartGame() {

    if (easyModus == true) {
        restart.addEventListener("click", easyMode);
        restart.removeEventListener("click", hardMode);
        restart.removeEventListener("click", mediumMode);
    }
    if (mediumModus == true) {
        restart.removeEventListener("click", easyMode);
        restart.removeEventListener("click", hardMode);
        restart.addEventListener("click", mediumMode);
    }
    if (hardModus == true) {
        restart.removeEventListener("click", easyMode);
        restart.removeEventListener("click", mediumMode);
        restart.addEventListener("click", hardMode);
    }
}

function restartRotate() {
    restartIcon.style.transform = "rotate(180deg)";
    restartIcon.classList.add("fa-2x");
}

function restartRotateBack() {
    restartIcon.style.transform = "rotate(0deg)";
    restartIcon.classList.remove("fa-2x");
    restartIcon.style.transition = "transform 0.5s";
    if(hover == true){
        restartIcon.style.transform = "rotate(800deg)";
    }
}

let hover = false;

function clickRestartButton() {
    restartIcon.style.transform = "scale(1.5)";
    hover = true;
    if (hover == true) {
        restartIcon.style.transform = "rotate(800deg)";
        restartIcon.style.transition = "transform 0.5s";
    }
}

restart.addEventListener("mouseover", restartGame);
restartIcon.addEventListener("mouseover", restartRotate);
restartIcon.addEventListener("mouseleave", restartRotateBack);
restartIcon.addEventListener("click", clickRestartButton);


function selectedEasy() {
    cards.forEach(sign => sign.setAttribute('style', 'width: calc(25% - 8px); height: calc(33.333% - 8px);'));
    front.forEach(sign => sign.setAttribute("style", "padding:"));
    back.forEach(sign => sign.setAttribute("style", "padding:"));
    cards.forEach(sign => sign.classList.remove("cardFlipped"));
    cards.forEach(board => board.addEventListener('click', cardFlip));
}

function selectedMedium() {
    cards.forEach(sign => sign.setAttribute('style', 'width: calc(16.666% - 8px); height: calc(33.333% - 8px'));
    front.forEach(sign => sign.setAttribute("style", "padding: 35px 10px 35px 10px;"));
    back.forEach(sign => sign.setAttribute("style", "padding: 35px 10px 35px 10px;"));
    cards.forEach(sign => sign.classList.remove("cardFlipped"));
    cards.forEach(board => board.addEventListener('click', cardFlip));
}

function selectedHard() {
    cards.forEach(sign => sign.setAttribute('style', 'display: block; width: calc(16.666% - 8px); height: calc(25% - 8px);'));
    front.forEach(sign => sign.setAttribute("style", "padding: 25px 10px 25px 10px;"));
    back.forEach(sign => sign.setAttribute("style", "padding: 25px 10px 25px 10px;"));
    cards.forEach(sign => sign.classList.remove("cardFlipped"));
    cards.forEach(board => board.addEventListener('click', cardFlip));
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


let lock = false;
let firstSign, secondSign;
let hasFlipped = false;

cards.forEach(board => board.addEventListener('click', cardFlip));

var parent = document.getElementById("game-board");
var nodesSameClass = parent.getElementsByClassName("cardFlipped");
var nodesSameClassMd = parent.getElementsByClassName("game-card-md");
var nodesSameClassHd = parent.getElementsByClassName("game-card-hd");

var thing = document.getElementById("game-card");
var node = document.querySelectorAll(".cardFlipped");


function myFunction() {
    if (document.getElementById("game-board").contains(thing)) {
        console.log("IT works");


    }


}

var winningModal = document.getElementById("staticBackdropLabel");

function cardFlip() {
    console.log(nodesSameClass.length);
    if (nodesSameClass.length === 11 && easyModus == true) {
        setTimeout(function () {
            $("#staticBackdrop-es").modal('show');
        }, 1200);

    }
    if (nodesSameClass.length === 17 && mediumModus == true) {
        setTimeout(function () {
            $("#staticBackdrop-es").modal('show');
            winningModal.innerHTML = "YOU WON MEDIUM";
        }, 1200);

    }
    if (nodesSameClass.length === 23 && hardModus == true) {
        setTimeout(function () {
            $("#staticBackdrop-es").modal('show');
            winningModal.innerHTML = "YOU WON HARD";
        }, 1200);

    }

    myFunction();
    if (lock === true) return;

    if (this === firstSign) return;


    integer += 1;
    int.innerHTML = 'Flips: ' + integer;

    this.classList.add('cardFlipped');



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
        firstSign.style.transform = "rotateY(180deg)";
        setTimeout(function () {
            secondSign.style.transform = "rotateY(180deg)";
        }, 200);
        setTimeout(function () {
            disableFlip();
        }, 201);

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

let element = document.querySelector(".game-card");

function reset() {
    hasFlipped = false;
    lock = false;
    firstSign = null;
    secondSign = null;
}