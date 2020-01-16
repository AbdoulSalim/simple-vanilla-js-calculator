"use strict"

let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        // This is not a number
        handleSymbol(value);
    }else {
        //This is a number
        handleNumber(value);
    }
    //Affichage des caractères à l'écran
    screen.innerText = buffer;
};

/*
Les fonctions handleSymbol et handleNumber sont dédiées à la séparation
des caractères et des nombres
*/

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0'
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOpperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol)
            break;
    }
};

function handleMath(symbol) {
    if (symbol === '0') {
        //ne fait rien
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOpperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = '0';
}

function flushOpperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    }else {
        buffer = buffer + numberString;
    }
};

/*Ici nous demandons à la fonction init d'appeler la fonction qui va suivre
toutes les fois où il y a un clic au niveau de la section avec class "calc-buttons"
*/
function init() {
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    })
}

init();
