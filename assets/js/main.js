const cards = document.querySelectorAll('.game-card');

function cardFlip() {
    this.classList.toggle('cardFlipped');
}

cards.forEach(board => board.addEventListener('click', cardFlip));



