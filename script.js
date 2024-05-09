'use strict';

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0')
const currentScore1 = document.getElementById('current--1')
const mainDice = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const quitBtn = document.querySelector('.btn--quit');
const holdBtn = document.querySelector('.btn--hold');
const zeroActive = document.querySelector('.player--0');
const firstActive = document.querySelector('.player--1');

// Выставление значений по умолчанию 

let totalScore , currentScore , activePlayer , play;

const initGame = function() {
    play = true;
    totalScore = [0,0];
    currentScore = 0;
    activePlayer = 0;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    mainDice.style.display = 'none';
    zeroActive.classList.remove('player--active');
    firstActive.classList.remove('player--active');
    zeroActive.classList.add('player--active')
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
}

initGame()

const loose = function() {
    currentScore = 0
    document.getElementById(`current--${activePlayer}`).textContent = currentScore
    activePlayer = activePlayer === 0 ? 1 : 0;

    // Перемещение заднего фона на активного игрока
    zeroActive.classList.toggle('player--active')
    firstActive.classList.toggle('player--active')
}



// Функция броска кубика
quitBtn.addEventListener('click', function() {
    if(play) {
    let randomNumber = Math.floor(Math.random() * 6) * 1 + 1;

    mainDice.style.display = 'block';
    mainDice.src = `dice${randomNumber}.png`;

    if(randomNumber !== 1){ 
        currentScore += randomNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore
    } else {
        loose()
    }
} 
});

holdBtn.addEventListener('click' , function() {
    if(play) {
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = totalScore[activePlayer]

    if(totalScore[activePlayer] >= 100) {
        play = false;   
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        mainDice.style.display = 'none';

        if(totalScore[activePlayer] >= 101) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--super--winner') 
        }
        
    } else {
        loose()
    }
    }
})

// Новая игра
newBtn.addEventListener('click', initGame)
