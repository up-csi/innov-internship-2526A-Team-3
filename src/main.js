import { WORDS } from './words.js';

const NUMBER_OF_GUESSES = 6;
const WORD_LENGTH = 5;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
const rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];

function initBoard() {
    const board = document.getElementById('game-board');

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        const row = document.createElement('div');
        row.className = 'letter-row flex';

        for (let j = 0; j < WORD_LENGTH; j++) {
            const box = document.createElement('div');
            box.className = 'letter-box';
            row.appendChild(box);
        }

        board.appendChild(row);
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName('keyboard-button')) {
        if (elem.textContent === letter) {
            if (elem.style.backgroundColor === 'green') {
                break;
            } else if (elem.style.backgroundColor === 'yellow' && color !== 'green') {
                break;
            }
            elem.style.backgroundColor = color;
            break;
        }
    }
}

function deleteLetter() {
    currentGuess.pop();
    nextLetter -= 1;
}

function checkValidity() {
    const word = currentGuess.join('');
    return WORDS.includes(word);
}

function checkGuess() {
    const row = document.getElementsByClassName('letter-row')[6 - guessesRemaining];
    let guessString = '';
    const rightGuess = Array.from(rightGuessString);

    for (const val of currentGuess) {
        guessString += val;
    }

    if (!checkValidity()) {
        alert('Invalid word!');
        return;
    }

    if (guessString.length !== WORD_LENGTH) {
        alert('Not enough letters!');
        return;
    }

    // Count number of occurences of each letter in the correct word
    const letterCount = {};
    for (const letter of rightGuess) {
        if (letterCount[letter]) {
            letterCount[letter]++;
        } else {
            letterCount[letter] = 1;
        }
    }

    // Iterate and find out the bg color of each letter of the currentGuess
    // Check the letters that match with the rightGuessString
    const currentGuessLetterColors = new Array(WORD_LENGTH).fill('');
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (currentGuess[i] === rightGuess[i]) {
            currentGuessLetterColors[i] = 'green';
            letterCount[currentGuess[i]]--;
        }
    }

    // Check the wrong letters and those that are in the wrong position/duplicates
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (currentGuessLetterColors[i] === '') {
            if (letterCount[currentGuess[i]]) {
                currentGuessLetterColors[i] = 'yellow';
                letterCount[currentGuess[i]]--;
            } else {
                currentGuessLetterColors[i] = 'grey';
            }
        }
    }

    for (let i = 0; i < WORD_LENGTH; i++) {
        const letterColor = currentGuessLetterColors[i];
        const box = row.children[i];
        const letter = currentGuess[i];

        const delay = 50 * i;
        setTimeout(() => {
            box.style.backgroundColor = letterColor;
            shadeKeyBoard(letter, letterColor);
        }, delay);
    }

    if (guessString === rightGuessString) {
        if (guessesRemaining === 1) {
            guessesRemaining = 0;
        } else {
            alert('You guessed right! Game over!');
            return;
        }
    }

    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining <= 0) {
        alert("You've run out of guesses! Game over!");
        alert(`The right word was: "${rightGuessString}"`);
    }
}

function insertLetter(pressedKey) {
    if (nextLetter === WORD_LENGTH) {
        return;
    }
    pressedKey = pressedKey.toLowerCase();

    const row = document.getElementsByClassName('letter-row')[6 - guessesRemaining];
    const box = row.children[nextLetter];
    box.textContent = pressedKey;
    box.classList.add('filled-box');
    currentGuess.push(pressedKey);
    nextLetter += 1;
}

document.addEventListener('keyup', e => {
    if (guessesRemaining === 0) {
        return;
    }

    const pressedKey = String(e.key);
    if (pressedKey === 'Backspace' && nextLetter !== 0) {
        deleteLetter();
        return;
    }

    if (pressedKey === 'Enter') {
        checkGuess();
        return;
    }

    const found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
        return;
    }
    insertLetter(pressedKey);
});

document.getElementById('keyboard-cont').addEventListener('click', e => {
    const target = e.target;

    if (!target.classList.contains('keyboard-button')) {
        return;
    }
    let key = target.textContent;

    if (key === 'Del') {
        key = 'Backspace';
    }

    document.dispatchEvent(new KeyboardEvent('keyup', { key: key }));
});

initBoard();
