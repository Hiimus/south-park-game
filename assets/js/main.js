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
let hard = document.getElementById('hard');
let startGame = document.getElementById('start-game');

let timerDiv = document.getElementById("timer");
let timer = false;
let cardFlipped = document.querySelectorAll(".cardFlipped");
let hover = false;
let restartWasClicked = false;
var parent = document.getElementById("game-board");
var nodesSameClass = parent.getElementsByClassName("cardFlipped");
var nodesSameClassMd = parent.getElementsByClassName("game-card-md");
var nodesSameClassHd = parent.getElementsByClassName("game-card-hd");
var thing = document.getElementById("game-card");
var node = document.querySelectorAll(".cardFlipped");
var winningModal = document.getElementById("staticBackdropLabel");
var time;
let restart = document.getElementById("restart");
let restartIcon = document.getElementById("restart-icon");
let element = document.querySelector(".game-card");
let lock = false;
let firstSign, secondSign;
let hasFlipped = false;
let reseted = false;
var audio1 = new Audio("assets/audio/transition.mp3");
var audio2 = new Audio("assets/audio/howdy-ho.mp3");
var audio3 = new Audio("assets/audio/nice.mp3");


easy.addEventListener('click', easyMode);
medium.addEventListener('click', mediumMode);
hard.addEventListener('click', hardMode);
startGame.addEventListener('click', startingGame);
restart.addEventListener("mouseover", restartGame);
restartIcon.addEventListener("mouseover", restartRotate);
restartIcon.addEventListener("mouseleave", restartRotateBack);
restartIcon.addEventListener("click", clickRestartButton);
cards.forEach(board => board.addEventListener('click', cardFlip));

function resetFlipCounter() {
    integer = 0;
    int.innerHTML = "Flips: 0";
}

function clickRestartButton() {
    
    restartWasClicked = true;
    resetFlipCounter();
    restartIcon.style.transform = "scale(1.5)";
    hover = true;
    if (hover == true) {
        restartIcon.style.transform = "rotate(800deg)";
        restartIcon.style.transition = "transform 0.5s";
    }
    if (easyModus === true){
        setTimeout(function (){
            timerDiv.innerHTML = "Timer: 30";
        }, 500);
        
    }
}

function timerStartEs() {
        var time = 30;
        var x = setInterval(function () {
        document.getElementById("timer").innerHTML = "Timer: " + time;
        time = time - 1;
        if(time < 0){
        clearInterval(x);
        console.log("You lost m8");
        
    }
    }, 1000);
}

function timerStartMd() {
        var time = 45;
        var x = setInterval(function () {
        document.getElementById("timer").innerHTML = "Timer: " + time;
        time = time - 1;
        if(time < 0){
        clearInterval(x);
        console.log("You lost m8");
        
    }
    }, 1000);
}

function timerStartHd() {
        var time = 59;
        var x = setInterval(function () {
        document.getElementById("timer").innerHTML = "Timer: " + time;
        time = time - 1;
        if(time < 0){
        clearInterval(x);
        console.log("You lost m8");
        
    }
    }, 1000);
}

function timerStart(){
    if (integer === 0){
        if (easyModus === true) {
            timerStartEs();
        }
        if (mediumModus === true) {
            timerStartMd();
        }
        if (hardModus === true) {
            timerStartHd();
        }
    }
}

function flipCounter(){
    integer += 1;
    int.innerHTML = 'Flips: ' + integer;
}    


function easyMode() {
    console.log('You selected easy');
    reseted = true;
    checkIfWonEasy();
    toggleMd();
    toggleHd();
    selectedEasy();
    shuffleCardsEs();
    displayNoneEasy();
    resetFlipCounter();
}

function checkIfWonEasy() {
    easyModus = true;
    mediumModus = false;
    hardModus = false;
}



function mediumMode() {
    console.log('You selected medium');
    checkIfWonMedium();
    toggleHd();
    selectedMedium();
    shuffleCardsMd();
    displayNoneMedium();
    resetFlipCounter();
}

function checkIfWonMedium() {
    easyModus = false;
    mediumModus = true;
    hardModus = false;
}

function hardMode() {
    console.log('You selected hard');
    checkIfWonHard();
    selectedHard();
    shuffleCardsHd();
    resetFlipCounter();
}

function checkIfWonHard() {
    easyModus = false;
    mediumModus = false;
    hardModus = true;
}

function startingGame() {
    $("#exampleModal").modal('hide');
    audio1.play();
}

function toggleMd() {

    selectMedium.forEach(sign => sign.classList.toggle('game-card-md'));
}

function toggleHd() {
    selectMedium.forEach(sign => sign.classList.toggle('game-card-md', 'game-card-hd'));
}

function restartGame() {
    
    reset();
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
    if (hover == true) {
        restartIcon.style.transform = "rotate(800deg)";
    }
}


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
    setTimeout(function () {
        cards.forEach(sign => {
        let randomPositions = Math.floor(Math.random() * 12);
        sign.style.order = randomPositions;
    });
    }, 500);
    
}

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

function modalWhenWinningEasy(){
    if (nodesSameClass.length === 11 && easyModus == true) {
        
        setTimeout(function () {
            $("#staticBackdrop-es").modal('show');
            audio2.play();
        }, 1200);
    }
}

function modalWhenWinningMedium(){
    if (nodesSameClass.length === 17 && mediumModus == true) {
        setTimeout(function () {
            $("#staticBackdrop-es").modal('show');
            audio2.play();
            winningModal.innerHTML = "YOU WON MEDIUM";
        }, 1200);
    }
}

function modalWhenWinningHard(){
    if (nodesSameClass.length === 23 && hardModus == true) {
        setTimeout(function () {
            $("#staticBackdrop-es").modal('show');
            audio2.play();
            winningModal.innerHTML = "YOU WON HARD";
        }, 1200);
    }
}

function cardFlip() {
    modalWhenWinningEasy();
    modalWhenWinningMedium();
    modalWhenWinningHard();
    if (lock === true) return;
    if (this === firstSign) return;
    timer = true;
    timerStart();
    flipCounter();
    this.classList.add('cardFlipped');
    if (!hasFlipped) {
        hasFlipped = true;
        firstSign = this;
        return;
    }
    secondSign = this;
    checkMatching();
}



function checkMatching() {
    if (firstSign.dataset.name === secondSign.dataset.name) {
        audio3.play();
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

function reset() {
    hasFlipped = false;
    lock = false;
    firstSign = null;
    secondSign = null;
}

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