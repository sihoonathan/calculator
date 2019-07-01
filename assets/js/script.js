function add (x, y) {
    return Number(x) + Number(y);
}

function subtract (x, y) {
    return Number(x) - Number(y);
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

function calculate(wholeArray) {


    for (let each of wholeArray) {
        if (each == '*' || each == '/') {
            let operatorIndex = wholeArray.indexOf(each)
            let leftOperandIndex = operatorIndex - 1;
            let rightOperandIndex = operatorIndex + 1;
            let result = each == '*' ? multiply(wholeArray[leftOperandIndex], wholeArray[rightOperandIndex]) : divide(wholeArray[leftOperandIndex], wholeArray[rightOperandIndex]);
            wholeArray.splice(leftOperandIndex, 3, result);
        }
    }

    while (true) {
        let multiIndex = wholeArray.indexOf('*');
        let divIndex = wholeArray.indexOf('/');
        let operatorIndex;
        let leftOperandIndex;
        let rightOperandIndex;

        if (multiIndex > 0 || divIndex > 0) {
            if (multiIndex > 0 && divIndex > 0) {
                operatorIndex = multiIndex < divIndex ? multiIndex : divIndex;
                leftOperandIndex = operatorIndex - 1;
                rightOperandIndex = operatorIndex + 1;
            } else if (multiIndex > 0 && divIndex < 0) {
                operatorIndex = multiIndex;
                leftOperandIndex = operatorIndex - 1;
                rightOperandIndex = operatorIndex + 1;
            } else {
                operatorIndex = divIndex;
                leftOperandIndex = operatorIndex - 1;
                rightOperandIndex = operatorIndex + 1;
            }

            let result = wholeArray[operatorIndex] == '*' ? multiply(wholeArray[leftOperandIndex], wholeArray[rightOperandIndex]) : divide(wholeArray[leftOperandIndex], wholeArray[rightOperandIndex]);

            wholeArray.splice(leftOperandIndex, 3, result);
        } else {
            break;
        }
    }

    while (true) {
        let addIndex = wholeArray.indexOf('+');
        let subtractIndex = wholeArray.indexOf('-');
        let operatorIndex;
        let leftOperandIndex;
        let rightOperandIndex;

        if (addIndex > 0 || subtractIndex > 0) {
            if (addIndex > 0 && subtractIndex > 0) {
                operatorIndex = addIndex < subtractIndex ? addIndex : subtractIndex;
                leftOperandIndex = operatorIndex - 1;
                rightOperandIndex = operatorIndex + 1;
            } else if (addIndex > 0 && subtractIndex < 0) {
                operatorIndex = addIndex;
                leftOperandIndex = operatorIndex - 1;
                rightOperandIndex = operatorIndex + 1;
            } else {
                operatorIndex = subtractIndex;
                leftOperandIndex = operatorIndex - 1;
                rightOperandIndex = operatorIndex + 1;
            }

            let result = wholeArray[operatorIndex] == '+' ? add(wholeArray[leftOperandIndex], wholeArray[rightOperandIndex]) : subtract(wholeArray[leftOperandIndex], wholeArray[rightOperandIndex]);

            wholeArray.splice(leftOperandIndex, 3, result);
        } else {
            break;
        }
    }

    return wholeArray[0];
}




// let screenBottom = document.querySelector("[data-key='screenBottom']");


function removeTransition(e) {

    if (this.classList.contains('Enter')) {
        this.classList.remove('enterPressed');
    }
    else {
        this.classList.remove('keyPressed');
    }
}

const buttons = document.querySelectorAll('button');

let inputList = [];
let inputNum = /[0-9.]/g;
let inputOperator = /[/*+\-]/g;
let firstOperator = /[/*+]/g;
let numQualifier = [];
const keyableKeys = /[0-9./\*\+\-\n\=]/g;
let displayedResult = false;
let prevAnswer;
let prevAnswerReset = false;

function displayInput(key) {

    const screenBottom = document.querySelector("[data-key='screenBottom'] span");

/*else if (displayedResult == true && prevAnswer) {
        let screenBottom = document.querySelector('[data-key="screenBottom"] span');
        screenBottom.textContent = "";
        displayedResult = false;*/

    if (key.match(inputNum)) {

        if (inputList.length > 0) {
            // if (inputList[inputList.length-1] == '.' && key == '.') return;

            if (numQualifier.includes('.') && key == '.' ) return;
        }

        if (prevAnswer && !prevAnswerReset) {
            screenBottom.textContent = "";
            prevAnswerReset = true;
        }

        screenBottom.textContent += key;
        inputList.push(key);
        numQualifier.push(key);
    } else if (key.match(inputOperator)) {
        if (prevAnswer && !prevAnswerReset) {
            return;
        }
        if (inputList.length == 0 && key.match(firstOperator)) {
            return;
        }

        else if (inputList.length > 0 && inputList[inputList.length-1].match(inputOperator) && (key.match(firstOperator) || inputList[inputList.length-1] == '-' && key == '-')) {
            return;
        }

        else if (inputList[inputList.length - 1] == '.') {
            return;
        }

        else {
            screenBottom.textContent += " " + key + " ";
            inputList.push(key);
            numQualifier = [];
        }
    } else {
        if (!inputList[inputList.length - 1].match(inputOperator) && inputList[inputList.length - 1] != '.') {
            inputList = [];
            numQualifier = [];
            prevAnswerReset = false;
            displayAbove();
        }
    }
}

let finalResult = 0;

function displayResult() {
    let screenBottom = document.querySelector("[data-key='screenBottom'] span");
    screenBottom.textContent = finalResult;
    displayedResult = true;
}

function displayAbove() {

    const screenBottom = document.querySelector("[data-key='screenBottom'] span");
    const screenTop = document.querySelector("[data-key='screenTop'] span");

    let contentToSplit = screenBottom.textContent;
    screenTop.textContent = screenBottom.textContent + " =";


    let splitted = contentToSplit.split(" ").filter(Boolean);
    console.log(splitted);

    if (splitted[0] == '-') {
        let numToChange = splitted[1];
        splitted.shift();
        splitted[0] = String(Number(numToChange) * -1);
    }

    let i = 0;
    while (i < splitted.length-1) {
        if (splitted[i] == '-' && splitted[i-1].match(firstOperator)) {
            let newNegativeNum = splitted[i+1] * -1;
            splitted.splice(i, 2, newNegativeNum);
            i = 0;
        }
        else {
            i++;
        }
    }

    const wholeArray = splitted;


    finalResult = Math.round(calculate(wholeArray) * 10**10) / 10**10;
    prevAnswer = finalResult;

    displayResult();
}

window.addEventListener('keydown', e => {
    if (!e.key.match(keyableKeys) && e.key != 'Enter') return;

    /*else if (displayedResult == true && prevAnswer) {
        let screenBottom = document.querySelector('[data-key="screenBottom"] span');
        screenBottom.textContent = "";
        displayedResult = false;
    }*/
    if (e.key == "=" || e.key == "Enter") {
        const pressedEnter = document.querySelector('.Enter');
        pressedEnter.classList.add('enterPressed');
        displayInput("=");
        // operate(); need to call this later
    } else {
        const pressedKeyElem = document.querySelector(`[data-key="${e.key}"]`);
        pressedKeyElem.className += "keyPressed";
        displayInput(e.key);
    }
});

function addClickEvent(e) {
    if (this.classList.contains('Enter')) this.classList.add('enterPressed');
    else this.classList.add('keyPressed');
}

buttons.forEach(button => {
    button.addEventListener('transitionend', removeTransition);
    button.addEventListener('click', addClickEvent)
});



// Exception cases:
// 34 * 4332 / 2.3
// 4322 / 2.3
// 2 + 3.2
// 123 * 3.4
// 123 - 3.4

