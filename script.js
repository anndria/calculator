//display
const displayEL = document.querySelector('.display');

//function elements
const acEL = document.querySelector('.ac');
const pnEL = document.querySelector('.pn');
const percentEL = document.querySelector('.percent');

//operator elements
const divisionEL = document.querySelector('.division');
const multiplicationEL = document.querySelector('.multiplication');
const substractionEL = document.querySelector('.substraction');
const additionEL = document.querySelector('.addition');
const equalEL = document.querySelector('.equal');

//numbers and decimals
const decimalEL = document.querySelector('.decimal');
const number0EL = document.querySelector(".number-0");
const number1EL = document.querySelector(".number-1");
const number2EL = document.querySelector(".number-2");
const number3EL = document.querySelector(".number-3");
const number4EL = document.querySelector(".number-4");
const number5EL = document.querySelector(".number-5");
const number6EL = document.querySelector(".number-6");
const number7EL = document.querySelector(".number-7");
const number8EL = document.querySelector(".number-8");
const number9EL = document.querySelector(".number-9");

const numberELArray = [
    number0EL, number1EL, number2EL, number3EL, number4EL,
    number5EL, number6EL, number7EL, number8EL, number9EL
];

let displayStrInMemory = null;
let operatorInMemory = null;

const getDisplayAsStr = () => {
    const currentDisplayStr = displayEL.textContent;
    return currentDisplayStr.split(',').join('');
}

const getDisplayAsNum = () => {
    return parseFloat(getDisplayAsStr());
}

const setStrAsDisplay = (displayStr) => {
    if (displayStr[displayStr.length - 1] == '.'){
        displayEL.textContent += '.';
        return;
    }

    const [wholeNumStr, decimalStr] = displayStr.split('.');
    if (decimalStr) {
        displayEL.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    }else {
        displayEL.textContent = parseFloat(wholeNumStr).toLocaleString();
    }
}

const handleNumberClick = (numStr) => {
    const currentDisplayStr = getDisplayAsStr();
    if (currentDisplayStr == '0') {
        setStrAsDisplay(numStr);
    }else {
        setStrAsDisplay(currentDisplayStr + numStr);
    }
};

const getResultOfOperationAsStr = () => {
    const currentDisplayNum = getDisplayAsNum();
    const displayNumInMemory = parseFloat(displayStrInMemory);
    let newDisplayNum;
    if (operatorInMemory == 'addition') {
        newDisplayNum = displayNumInMemory + currentDisplayNum;
    }else if (operatorInMemory == 'substraction') {
        newDisplayNum = displayNumInMemory - currentDisplayNum;
    }else if (operatorInMemory == 'multiplication') {
        newDisplayNum = displayNumInMemory * currentDisplayNum;
    }else if (operatorInMemory == 'division') {
        newDisplayNum = displayNumInMemory / currentDisplayNum;
    }

    return newDisplayNum.toString();
};

const handleOperatorClick = (operation) => {
    const currentDisplayStr = getDisplayAsStr();

    if(!displayStrInMemory) {
        displayStrInMemory = currentDisplayStr;
        operatorInMemory = operation;
        setStrAsDisplay('0');
        return;
    }

    displayStrInMemory = getResultOfOperationAsStr();
    operatorInMemory = operation;
    setStrAsDisplay('0');
};

//functions

acEL.addEventListener('click', () => {
    setStrAsDisplay('0');
    displayStrInMemory = null;
    operatorInMemory = null;
});

pnEL.addEventListener('click', () => {
    const currentDisplayNum = getDisplayAsNum();
    const currentDisplayStr = getDisplayAsStr();

    if(currentDisplayStr == '-0') {
        setStrAsDisplay('0');
        return;
    }
    if(currentDisplayNum >= 0) {
        setStrAsDisplay('-' + currentDisplayStr);
    }else {
        setStrAsDisplay(currentDisplayStr.substring(1));
    }
});

percentEL.addEventListener('click', () => {
    const currentDisplayNum = getDisplayAsNum();
    const newDisplayNum = currentDisplayNum / 100;
    setStrAsDisplay(newDisplayNum.toString());
    displayStrInMemory = null;
    operatorInMemory = null;
});

//operators

additionEL.addEventListener('click', () => {
    handleOperatorClick('addition');
});

substractionEL.addEventListener('click', () => {
    handleOperatorClick('substraction');
});

multiplicationEL.addEventListener('click', () => {
    handleOperatorClick('multiplication');
});

divisionEL.addEventListener('click', () => {
    handleOperatorClick('division');
})

equalEL.addEventListener('click', () => {
    if(displayStrInMemory) {
        setStrAsDisplay(getResultOfOperationAsStr());
        displayStrInMemory = null;
        operatorInMemory = null;
    }
});

//numbers, decimal

for (let i = 0; i < numberELArray.length; i++) {
    const numberEL = numberELArray[i];
    numberEL.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
}

decimalEL.addEventListener('click', () => {
    const currentDisplayStr = getDisplayAsStr();
    if (!currentDisplayStr.includes('.')) {
        setStrAsDisplay(currentDisplayStr + '.');
    }
});