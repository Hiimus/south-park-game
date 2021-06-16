$(document).ready(function () {
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
let mute = document.getElementById("mute");
let volume = document.getElementById("volume");
let menu = document.getElementById("menu");
let startWasClicked = false;
let wasDifficultyClicked = false;
let modalContent = document.getElementById("modal-content")
let pc = document.getElementById("pc");
let bubble = document.getElementById("bubble");
let modalContentBackground = document.getElementById("modal-background");
let audio = 
[new Audio("assets/audio/transition.mp3"), 
new Audio("assets/audio/howdy-ho.mp3"), 
new Audio("assets/audio/nice.mp3"), 
new Audio("assets/audio/flip.flac"),
new Audio("assets/audio/wrong.mp3"),
new Audio("assets/audio/click.mp3"),
new Audio("assets/audio/pc-corrects-sp.mp3")];

modalContentBackground.addEventListener("click", clickedAgain);
mute.addEventListener("click", muted);
volume.addEventListener("click", muted);
easy.addEventListener('click', easyMode);
medium.addEventListener('click', mediumMode);
hard.addEventListener('click', hardMode);
startGame.addEventListener('click', startingGame);
startGame.addEventListener('mouseover', startingGameCheck);
restart.addEventListener("mouseover", restartGame);
restartIcon.addEventListener("mouseover", restartRotate);
restartIcon.addEventListener("mouseleave", restartRotateBack);
restartIcon.addEventListener("click", clickRestartButton);
cards.forEach(board => board.addEventListener('click', cardFlip));
menu.addEventListener("click", menuClick);



//Inspiration from https://www.developphp.com/video/JavaScript/Audio-Play-Pause-Mute-Buttons-Tutorial on how to make volume control
function muted() {
    mute.classList.toggle('muted');
    volume.classList.toggle('muted');
    if(audio[0].muted && audio[1].muted && audio[2].muted){
            audio[0].muted = false; 
            audio[1].muted = false;
            audio[2].muted = false;
	    } else {
		    audio[0].muted = true; 
            audio[1].muted = true;
            audio[2].muted = true;
	    }
	
}


function menuClick() {
    audio[5].play();
    wasDifficultyClicked = false;
    modalColorReset();
}

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
    modalColorEs()
    audio[5].play();
    wasDifficultyClicked = true;
}

function modalColorReset() {
    easy.style.border = "none";
    easy.style.backgroundColor = "";
    medium.style.border = "none";
    medium.style.backgroundColor = "";
    hard.style.border = "none";
    hard.style.backgroundColor = "";
}

function modalColorEs() {
    easy.style.border = "1px solid #f77979";
    easy.style.backgroundColor = "#f77979";
    medium.style.border = "none";
    medium.style.backgroundColor = "";
    hard.style.border = "none";
    hard.style.backgroundColor = "";
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
    modalColorMd();
    audio[5].play();
    wasDifficultyClicked = true;
}

function modalColorMd() {
    easy.style.border = "none";
    easy.style.backgroundColor = "";
    medium.style.border = "1px solid #f77979";
    medium.style.backgroundColor = "#f77979";
    hard.style.border = "none";
    hard.style.backgroundColor = "";
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
    modalColorHd();
    audio[5].play();
    wasDifficultyClicked = true;
}

function modalColorHd() {
    easy.style.border = "none";
    easy.style.backgroundColor = "";
    medium.style.border = "none";
    medium.style.backgroundColor = "";
    hard.style.border = "1px solid #f77979";
    hard.style.backgroundColor = "#f77979";
}

function checkIfWonHard() {
    easyModus = false;
    mediumModus = false;
    hardModus = true;
}

function startingGame() {
    $("#exampleModal").modal('hide');
    audio[0].play();
    startWasClicked = true;
    
}

function clickedAgain() {
    if(!wasDifficultyClicked){
    pc.classList.remove("d-none");
    bubble.classList.remove("d-none");
    audio[6].play();
        setTimeout(function(){
            pc.classList.add("d-none");
            bubble.classList.add("d-none");
        }, 3000);
        
    }
}

function startingGameCheck() {
    if(wasDifficultyClicked === true){
        startGame.addEventListener('click', startingGame);
    } else {
        startGame.removeEventListener('click', startingGame);
        PcP = true;
        
    }
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
            audio[1].play();
        }, 1200);
    }
}

function modalWhenWinningMedium(){
    if (nodesSameClass.length === 17 && mediumModus == true) {
        setTimeout(function () {
            $("#staticBackdrop-es").modal('show');
            audio[1].play();
            winningModal.innerHTML = "YOU WON MEDIUM";
        }, 1200);
    }
}

function modalWhenWinningHard(){
    if (nodesSameClass.length === 23 && hardModus == true) {
        setTimeout(function () {
            $("#staticBackdrop-es").modal('show');
            audio[1].play();
            winningModal.innerHTML = "YOU WON HARD";
        }, 1200);
    }
}

function cardFlip() {
    audio[3].play();
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
        audio[2].play();
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
        audio[4].play();
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