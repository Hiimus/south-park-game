
/*Learned how to show modal on load from this website https://www.tutorialrepublic.com/codelab.php?topic=faq&file=show-bootstrap-modal-on-page-load */

$(document).ready(function () {
    $("#exampleModal").modal('show');
});

/* All declarations*/

const cards = document.querySelectorAll('.game-card');
const divsArr = Array.from(cards); /* Learned how to make an array of querySelectorAll from this site: https://www.tutorialsteacher.com/javascript/javascript-array */
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
let hover = false;
let restartWasClicked = false;
let parent = document.getElementById("game-board");
var nodesSameClass = parent.getElementsByClassName("cardFlipped");
let contactMenu = document.getElementById("contact-menu");
let wonLevel = false;
var winningModal = document.getElementById("staticBackdropLabel");
let restart = document.getElementById("restart");
let restartIcon = document.getElementById("restart-icon");
let lock = false;
let firstSign, secondSign;
let hasFlipped = false;
let mute = document.getElementById("mute");
let volume = document.getElementById("volume");
let menu = document.getElementById("menu");
let startWasClicked = false;
let wasDifficultyClicked = false;
let pc = document.getElementById("pc");
let bubble = document.getElementById("bubble");
let modalContentBackground = document.getElementById("modal-background");
let bronzeTrophy = document.getElementById("bronze");
let silverTrophy = document.getElementById("silver");
let goldTrophy = document.getElementById("gold");
let tryAgainLose = document.getElementById("try-again-lose");
let menuWasClicked = false;
let loseMenu = document.getElementById("game-menu-lose");
let winMenu = document.getElementById("game-menu-win");
let tryAgainWin = document.getElementById("try-again-win");
let audio = 
[new Audio("assets/audio/transition.mp3"), 
new Audio("assets/audio/howdy-ho.mp3"), 
new Audio("assets/audio/nice.mp3"), 
new Audio("assets/audio/flip.flac"),
new Audio("assets/audio/wrong.mp3"),
new Audio("assets/audio/click.mp3"),
new Audio("assets/audio/pc-corrects-sp.mp3"),
new Audio("assets/audio/lose.flac"),
new Audio("assets/audio/bell-4.mp3")];

/*All event listeners*/

tryAgainWin.addEventListener("click", retry);
winMenu.addEventListener("click", beforeMenuClick);
loseMenu.addEventListener("click", beforeMenuClick);
tryAgainLose.addEventListener("click", retry);
modalContentBackground.addEventListener("click", popupWarning);
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
contactMenu.addEventListener("click", noWarning);

/* All functions*/

function beforeMenuClick() {
    setTimeout(function () {
        $("#exampleModal").modal('show');
        menuClick();
    }, 500);
   
}

//Inspiration from https://www.developphp.com/video/JavaScript/Audio-Play-Pause-Mute-Buttons-Tutorial on how to make volume control

function muted() {
    mute.classList.toggle('muted');
    volume.classList.toggle('muted');
    if(audio[0].muted && audio[1].muted && audio[2].muted && audio[3].muted && audio[4].muted && audio[5].muted && audio[6].muted && audio[7].muted && audio[8].muted){
        audioMutedFalse();
	} else {
		audioMutedTrue();
	}
	
}

/*This function is called when volume button is clicked, so all sound effects get muted*/

function audioMutedTrue() {
    audio[0].muted = true; 
    audio[1].muted = true;
    audio[2].muted = true;
    audio[3].muted = true;
    audio[4].muted = true;
    audio[5].muted = true;
    audio[6].muted = true;
    audio[7].muted = true;
    audio[8].muted = true;
}

/*This function is called when volume button is clicked, so all sound effects get unmuted*/

function audioMutedFalse() {
    audio[0].muted = false; 
    audio[1].muted = false;
    audio[2].muted = false;
    audio[3].muted = false;
    audio[4].muted = false;
    audio[5].muted = false;
    audio[6].muted = false;
    audio[7].muted = false;
    audio[8].muted = false;
}

/*When clicking on "try again" on winning modal and losing modal, this function is called*/

function retry() {
    if(easyModus === true){
        easyMode();
    }
    if(mediumModus === true){
        mediumMode();
    }
    if(hardModus === true){
        hardMode();
    }
}

/*When clicking on the menu button, this function is called*/

function menuClick() {
    audio[5].play();
    wasDifficultyClicked = false;
    modalColorReset();
    menuWasClicked = true;
    clickRestartButton();
    setTimeout(function () {
        menuWasClicked = false;
    },1000);
}

/*Resets the flip counter*/

function resetFlipCounter() {
    integer = 0;
    int.innerHTML = "Flips: 0";
}

/* Function is called when restart button is clicked. Rotates restart button, resets timer, flip counter and all cards. */

function clickRestartButton() {
    wonLevel = false;
    restartWasClicked = true;
    clearTimerRestart();
    resetFlipCounter();
    restartIcon.style.transform = "scale(1.5)";
    hover = true;
    hoverRestart();
    resetTimerEs();
    resetTimerMd();
    resetTimerHd();
}

/*This function will clearinterval/reset timer when clicking restart button (see timerStart functions)*/

function clearTimerRestart() {
    if(restartWasClicked === true){
        setTimeout(function (){
            restartWasClicked = false;
        }, 1050);
    }
}

/*When hovering restart button, it will rotate*/

function hoverRestart() {
    if (hover == true) {
        restartIcon.style.transform = "rotate(800deg)";
        restartIcon.style.transition = "transform 0.5s";
    }
}

/*Resets the timer for easy mode*/

function resetTimerEs() {
    if (easyModus === true){
        setTimeout(function (){
            timerDiv.innerHTML = "Timer: 30";
        }, 1050);
        
    }
}

/*Resets the timer for medium mode*/

function resetTimerMd() {
    if (mediumModus === true){
        setTimeout(function (){
            timerDiv.innerHTML = "Timer: 45";
        }, 1050);
    }
}

/*Resets the timer for hard mode*/

function resetTimerHd() {
    if (hardModus === true){
        setTimeout(function (){
            timerDiv.innerHTML = "Timer: 59";
        }, 1050);
    }
}

/*Is called when you lose the game*/

function modalWhenLosing() {
    setTimeout(function () {
            $("#staticBackdrop-lose").modal('show');
            audio[7].play();
        }, 1200);
}

/* A timer which is called when starting a game on easy */

function timerStartEs() {
    var time = 30;
    var x = setInterval(function () {
    document.getElementById("timer").innerHTML = "Timer: " + time;
    time = time - 1;
    if(time < 0){
        clearInterval(x);
        modalWhenLosing();  
    }
    if(restartWasClicked === true){
        clearInterval(x);
    }
    if(wonLevel === true){
        clearInterval(x);
    }
    if(time > 10){
        goldMedal();
    }  
    if(time < 10){
        silverMedal();
    }
    if(time < 5){
        bronzeMedal();
        audio[8].play();
    }
    ifMenuWasClicked();
    }, 1000);
}

/*Condition that says if the menu button was clicked, call the clickRestartButton() which resets everything.*/

function ifMenuWasClicked() {
    if(menuWasClicked === true){
            clickRestartButton();
    }
}

/* A timer which is called when starting a game on medium */

function timerStartMd() {
    var time = 45;
    var x = setInterval(function () {
    document.getElementById("timer").innerHTML = "Timer: " + time;
    time = time - 1;
    if(time < 0){
        clearInterval(x);
        modalWhenLosing();
    }
    if(restartWasClicked === true){
        clearInterval(x);
    }
    if(wonLevel === true){
        clearInterval(x);
    }
    if(time > 10){
        goldMedal();
    }  
    if(time < 10){
        silverMedal();
    }
    if(time < 5){
        bronzeMedal();
        audio[8].play();
    }
    ifMenuWasClicked();
    }, 1000);
}

/* A timer which is called when starting a game on hard */

function timerStartHd() {
    var time = 59;
    var x = setInterval(function () {
    document.getElementById("timer").innerHTML = "Timer: " + time;
    time = time - 1;
    if(time < 0){
        clearInterval(x);
        modalWhenLosing();
    }
    if(restartWasClicked === true){
        clearInterval(x);
    }
    if(wonLevel === true){
        clearInterval(x);
    }
        
    if(time > 10){
        goldMedal();
    }  
    if(time < 10){
        silverMedal();
    }
    if(time < 5){
        bronzeMedal();
        audio[8].play();
    }
    ifMenuWasClicked();
    }, 1000);
}

/*A function that decides which of the timeStart functions to start*/

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

/*Flip counter function that increases with each click on card*/

function flipCounter(){
    integer += 1;
    int.innerHTML = 'Flips: ' + integer;
}    

/* When clicking on easy difficulty, this function is called.*/

function easyMode() {
    wonLevel = false;
    checkIfWonEasy();
    toggleMd();
    toggleHd();
    selectedEasy();
    shuffleCardsEs();
    displayNoneEasy();
    resetFlipCounter();
    modalColorEs();
    audio[5].play();
    wasDifficultyClicked = true;
    integer = 0;
    setTimeout(function () {
        timerDiv.innerHTML = "Timer: 30";
    }, 500);
    
}

/* When clicking on medium difficulty, this function is called.*/

function mediumMode() {
    wonLevel = false;
    checkIfWonMedium();
    toggleHd();
    selectedMedium();
    shuffleCardsMd();
    displayNoneMedium();
    resetFlipCounter();
    modalColorMd();
    audio[5].play();
    wasDifficultyClicked = true;
    integer = 0;    
    setTimeout(function () {
        timerDiv.innerHTML = "Timer: 45";
    }, 500);
}

/* When clicking on hard difficulty, this function is called.*/

function hardMode() {
    wonLevel = false;
    checkIfWonHard();
    selectedHard();
    shuffleCardsHd();
    resetFlipCounter();
    modalColorHd();
    audio[5].play();
    wasDifficultyClicked = true;
    setTimeout(function () {
        timerDiv.innerHTML = "Timer: 59";
    }, 500);
    integer = 0;
}

/* Resets the background color of the difficulties in the menu modal */

function modalColorReset() {
    easy.style.border = "none";
    easy.style.backgroundColor = "";
    medium.style.border = "none";
    medium.style.backgroundColor = "";
    hard.style.border = "none";
    hard.style.backgroundColor = "";
}

/*Sets the background color on the easy button in the menu modal */

function modalColorEs() {
    easy.style.border = "1px solid #f77979";
    easy.style.backgroundColor = "#f77979";
    medium.style.border = "none";
    medium.style.backgroundColor = "";
    hard.style.border = "none";
    hard.style.backgroundColor = "";
}

/*Sets the background color on the medium button in the menu modal */

function modalColorMd() {
    easy.style.border = "none";
    easy.style.backgroundColor = "";
    medium.style.border = "1px solid #f77979";
    medium.style.backgroundColor = "#f77979";
    hard.style.border = "none";
    hard.style.backgroundColor = "";
}

/*Sets the background color on the hard button in the menu modal */

function modalColorHd() {
    easy.style.border = "none";
    easy.style.backgroundColor = "";
    medium.style.border = "none";
    medium.style.backgroundColor = "";
    hard.style.border = "1px solid #f77979";
    hard.style.backgroundColor = "#f77979";
}

/*Checks if easy difficulty is won */

function checkIfWonEasy() {
    easyModus = true;
    mediumModus = false;
    hardModus = false;
}

/*Checks if medium difficulty is won */

function checkIfWonMedium() {
    easyModus = false;
    mediumModus = true;
    hardModus = false;
}

/*Checks if hard difficulty is won */

function checkIfWonHard() {
    easyModus = false;
    mediumModus = false;
    hardModus = true;
}

/*Is called when start game is clicked in modal, plays a sound effect and hides menu modal*/

function startingGame() {
    $("#exampleModal").modal('hide');
    audio[0].play();
    startWasClicked = true;
}

/* Is called when not clicking a difficulty. PC Principle will give a reminder of what to do. */

function popupWarning() {
    
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

/*If the contact button in the menu modal is clicked, there will not be any popup message. popupWarning() will not be executed*/

function noWarning() {
    wasDifficultyClicked = true;
}

/*Removes event listener to start game button if difficulty is not clicked, so that popupWarning() works properly.*/

function startingGameCheck() {
    if(wasDifficultyClicked === true){
        startGame.addEventListener('click', startingGame);
    } else {
        startGame.removeEventListener('click', startingGame);
    }
}

/*When selecting a difficulty the class game-card-md is toggled. This decides how many cards are being displayed */

function toggleMd() {
    selectMedium.forEach(sign => sign.classList.toggle('game-card-md'));
}

/*When selecting a difficulty the class game-card-md and game-card-hd is toggled. This decides how many cards are being displayed */

function toggleHd() {
    selectMedium.forEach(sign => sign.classList.toggle('game-card-md', 'game-card-hd'));
}

/*Resets cards, depending on which difficulty mode is true*/

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

/*Restart button rotates on mouseover*/

function restartRotate() {
    restartIcon.style.transform = "rotate(180deg)";
    restartIcon.classList.add("fa-2x");
}

/*Restart button rotates on mouseleave*/

function restartRotateBack() {
    restartIcon.style.transform = "rotate(0deg)";
    restartIcon.classList.remove("fa-2x");
    restartIcon.style.transition = "transform 0.5s";
    if (hover == true) {
        restartIcon.style.transform = "rotate(800deg)";
    }
}

/*Styles that are set to all the cards when selecting easy difficulty */

function selectedEasy() {
    cards.forEach(sign => sign.setAttribute('style', 'width: calc(25% - 8px); height: calc(33.333% - 8px);'));
    front.forEach(sign => sign.setAttribute("style", "padding:"));
    back.forEach(sign => sign.setAttribute("style", "padding:"));
    cards.forEach(sign => sign.classList.remove("cardFlipped"));
    cards.forEach(board => board.addEventListener('click', cardFlip));
}

/*Styles that are set to all the cards when selecting medium difficulty */

function selectedMedium() {
    cards.forEach(sign => sign.setAttribute('style', 'width: calc(16.666% - 8px); height: calc(33.333% - 8px'));
    front.forEach(sign => sign.setAttribute("style", "padding: 35px 10px 35px 10px;"));
    back.forEach(sign => sign.setAttribute("style", "padding: 35px 10px 35px 10px;"));
    cards.forEach(sign => sign.classList.remove("cardFlipped"));
    cards.forEach(board => board.addEventListener('click', cardFlip));
}

/*Styles that are set to all the cards when selecting hard difficulty */

function selectedHard() {
    cards.forEach(sign => sign.setAttribute('style', 'display: block; width: calc(16.666% - 8px); height: calc(25% - 8px);'));
    front.forEach(sign => sign.setAttribute("style", "padding: 25px 10px 25px 10px;"));
    back.forEach(sign => sign.setAttribute("style", "padding: 25px 10px 25px 10px;"));
    cards.forEach(sign => sign.classList.remove("cardFlipped"));
    cards.forEach(board => board.addEventListener('click', cardFlip));
}

/* Cards shuffling on easy mode */

function shuffleCardsEs() {
    setTimeout(function () {
        cards.forEach(sign => {
        let randomPositions = Math.floor(Math.random() * 12);
        sign.style.order = randomPositions;
    });
    }, 500);
}

/* Cards shuffling on medium mode */

function shuffleCardsMd() {
    cards.forEach(sign => {
        let randomPositions = Math.floor(Math.random() * 18);
        sign.style.order = randomPositions;
    });
}

/* Cards shuffling on hard mode */

function shuffleCardsHd() {
    cards.forEach(sign => {
        let randomPositions = Math.floor(Math.random() * 24);
        sign.style.order = randomPositions;
    });
}

/*Modal that is displayed when winning easy mode */

function modalWhenWinningEasy(){
    if (nodesSameClass.length === 11 && easyModus === true) {
         wonLevel = true;
        setTimeout(function () {
            $("#staticBackdrop-es").modal('show');
            audio[1].play();
            winningModal.innerHTML = "YOU WON EASY";
        }, 1200);
    }
}

/*Modal that is displayed when winning medium mode */

function modalWhenWinningMedium(){
    if (nodesSameClass.length === 17 && mediumModus === true) {
        wonLevel = true;
        setTimeout(function () {
            $("#staticBackdrop-es").modal('show');
            audio[1].play();
            winningModal.innerHTML = "YOU WON MEDIUM";
        }, 1200);
    }
}

/*Modal that is displayed when winning hard mode */

function modalWhenWinningHard(){
    if (nodesSameClass.length === 23 && hardModus === true) {
        wonLevel = true;
        setTimeout(function () {
            $("#staticBackdrop-es").modal('show');
            audio[1].play();
            winningModal.innerHTML = "YOU WON HARD";
        }, 1200);
    }
}

/*If more than 10 seconds left of game, gold medal is displayed in winning modal*/

function goldMedal(){
    bronzeTrophy.style.opacity = "50%";
    silverTrophy.style.opacity = "50%";
    goldTrophy.style.opacity = "100%";
    pulseTrophyGold();
}

/*If 6-10 seconds left of game, silver medal is displayed in winning modal*/

function silverMedal(){
    bronzeTrophy.style.opacity = "50%";
    silverTrophy.style.opacity = "100%";
    goldTrophy.style.opacity = "50%";
    pulseTrophySilver();
}

/*If 0-5 seconds left of game, bronze medal is displayed in winning modal*/

function bronzeMedal(){
    bronzeTrophy.style.opacity = "100%";
    silverTrophy.style.opacity = "50%";
    goldTrophy.style.opacity = "50%";
    pulseTrophyBronze();
}

/*If you win the gold medal, the trophy will pulse*/

function pulseTrophyGold() {
    if(wonLevel === true){
        goldTrophy.style.animation = "pulse 1s linear infinite";
        silverTrophy.style.animation = "1s linear infinite";
        bronzeTrophy.style.animation = "1s linear infinite";
    }
}

/*If you win the silver medal, the trophy will pulse*/

function pulseTrophySilver() {
    if(wonLevel === true){
        silverTrophy.style.animation = "pulse 1s linear infinite";
        goldTrophy.style.animation = "1s linear infinite";
        bronzeTrophy.style.animation = "1s linear infinite";
    }
}

/*If you win the bronze medal, the trophy will pulse*/

function pulseTrophyBronze() {
    if(wonLevel === true){
        bronzeTrophy.style.animation = "pulse 1s linear infinite";
        silverTrophy.style.animation = "1s linear infinite";
        goldTrophy.style.animation = "1s linear infinite";
    }
}



/* Each time a card is clicked, this function is called. Flips card, checks if there is a match or not. 
Also initates timer and flip counter. Initial code was taken from https://github.com/code-sketch/memory-game/ , 
But some functions have been modified by me after. */

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

/*Checks if the cards match or not. */

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
        notMatching();
        audio[4].play();
    }
}

/*If cards match, cards are disabled*/

function disableFlip() {
    firstSign.removeEventListener('click', cardFlip);
    secondSign.removeEventListener('click', cardFlip);
    reset();

}

/*If cards do not match, the class cardFlipped will be removed, which flips back the cards*/

function notMatching() {
    lock = true;
    setTimeout(function () {
        firstSign.classList.remove('cardFlipped');
        secondSign.classList.remove('cardFlipped');
        reset();
    }, 1000);
}

/*Resets the declarations that are used in function cardFlip.
Code is from https://github.com/code-sketch/memory-game/ .*/

function reset() {
    hasFlipped = false;
    lock = false;
    firstSign = null;
    secondSign = null;
}

/*When selecting easy mode, cards 12-23 are not displaying. Leaving 12 cards on the board*/

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

/*When selecting medium mode, cards 18-23 are not displaying. Leaving 18 cards on the board*/

function displayNoneMedium() {
    divsArr[18].style.display = "none";
    divsArr[19].style.display = "none";
    divsArr[20].style.display = "none";
    divsArr[21].style.display = "none";
    divsArr[22].style.display = "none";
    divsArr[23].style.display = "none";
}