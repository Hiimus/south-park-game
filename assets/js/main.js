$(document).ready(function () {
    cards.forEach(sign => sign.style.display = 'block');
    displayNoneEasy();
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

function selectedEasy() {
    cards.forEach(sign => sign.setAttribute('style', 'width: calc(25% - 8px); height: calc(33.333% - 8px);'));
    front.forEach(sign => sign.setAttribute("style", "padding:"));
    back.forEach(sign => sign.setAttribute("style", "padding:"));
}

function selectedMedium() {
    cards.forEach(sign => sign.setAttribute('style', 'width: calc(16.666% - 8px); height: calc(33.333% - 8px'));
    front.forEach(sign => sign.setAttribute("style", "padding: 35px 10px 35px 10px;"));
    back.forEach(sign => sign.setAttribute("style", "padding: 35px 10px 35px 10px;"));
}

function selectedHard() {
    cards.forEach(sign => sign.setAttribute('style', 'display: block; width: calc(16.666% - 8px); height: calc(25% - 8px);'));
    front.forEach(sign => sign.setAttribute("style", "padding: 25px 10px 25px 10px;"));
    back.forEach(sign => sign.setAttribute("style", "padding: 25px 10px 25px 10px;"));
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
var node = document.querySelectorAll("cardFlipped");

function myFunction() {
    if(document.getElementById("game-board").contains(thing)){
        console.log("IT works");
        
    
    }
  
  
}


function cardFlip() {
    console.log(nodesSameClass.length);
    if (nodesSameClass.length === 11 && easyModus == true){
        setTimeout(function () {
            alert("YOU DID IT! EASY!!");
        }, 1200);
        
    }
    if (nodesSameClass.length === 17 && mediumModus == true){
        setTimeout(function () {
            alert("YOU DID IT! MEDIUM!!");
        }, 1200);
        
    }
    if (nodesSameClass.length === 23 && hardModus == true){
        setTimeout(function () {
            alert("YOU DID IT! HARD!!");
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