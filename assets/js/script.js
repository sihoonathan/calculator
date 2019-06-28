function add (x, y) {
    return x + y;
}

function subtract (x, y) {
    return x - y;
}

function multiply (x, y) {
    return x * y;
}

function divide (x, y) {
    return x / y;
}

function operate(operation, x, y) {
    return operation(x, y);
}

function sum (array) {
    let arraySum = 0;

    for(let i = 0; i < array.length; i++) {
        arraySum += array[i];
    }

    return arraySum
}

function multiplyArray (array) {
    let product = 1;

    for(let i = 0; i < array.length; i++) {
        product *= array[i];
    }

    return product;
}

function divideArray (...numbers) {
    let first = numbers[0];
    for (let num of numbers.slice(1)) {
        first /= num;
    }
    return first;
}
// let screenBottom = document.querySelector("[data-key='screenBottom']");

const buttons = document.querySelectorAll('button');

window.addEventListener('keydown', e => {
    const pressedKeyElem = document.querySelector(`[data-key="${e.key}"]`);

    const pressedEnter = document.querySelector('.Enter');

    if (!pressedKeyElem && !pressedEnter) return;

    if (e.key == "=" || e.key == "Enter") {
        pressedEnter.classList.add('enterPressed');
        // operate(); need to call this later
    } else {
        pressedKeyElem.classList.add("keyPressed");
    }
});

console.log(buttons);

buttons.forEach(button => {
    console.log(button);
    button.addEventListener('transitionend', removeTransition);
});


function removeTransition(e) {
    console.log(e);
    console.log(this);

    if (this.className == 'Enter') {
        this.classList.remove('enterPressed');
    }
    else {
        this.classList.remove('keyPressed');
    }
}


